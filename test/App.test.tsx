import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import App from '../src/App';
import fetchMock from '../src/helpers/fetchMock';

const mockDataOneFile = [
  {
    type: 'pdf',
    name: 'Employee Handbook',
    added: '2017-01-06'
  }
];

const mockDataFolderWithFiles = [
  {
    id: '2',
    type: 'folder',
    name: 'Expenses',
    files: [
      {
        type: 'doc',
        name: 'Expenses claim form',
        added: '2017-05-02'
      }
    ]
  }
];

const mockDataWithMultipleFilesAndFolders = [
  {
    type: 'pdf',
    name: 'Employee Handbook',
    added: '2017-01-06',
    size: '3.2 MB'
  },
  {
    type: 'pdf',
    name: 'Public Holiday policy',
    added: '2016-12-06',
    size: '1.4 MB'
  },
  {
    id: '1',
    type: 'folder',
    name: 'Expenses',
    added: '2017-04-06',
    size: '1.2 MB',
    files: [
      {
        type: 'doc',
        name: 'Expenses claim form',
        added: '2017-05-02',
        size: '0.3 MB'
      },
      {
        type: 'doc',
        name: 'Fuel allowances',
        added: '2017-05-03',
        size: '0.2 MB'
      }
    ]
  },
  {
    type: 'csv',
    name: 'Cost centres',
    added: '2016-08-12',
    size: '0.1 MB'
  },
  {
    id: '2',
    type: 'folder',
    name: 'Misc',
    added: '2014-04-06',
    size: '0.5 MB',
    files: [
      {
        type: 'doc',
        name: 'Christmas party',
        added: '2017-12-01',
        size: '0.4 MB'
      },
      {
        type: 'mov',
        name: 'Welcome to the company!',
        added: '2015-04-24',
        size: '0.1 MB'
      }
    ]
  }
];

describe('App', () => {
  let mockFetchMock: jest.Mock;

  beforeEach(() => {
    vi.mock('../src/helpers/fetchMock', () => {
      return {
        default: vi.fn()
      };
    });
    mockFetchMock = fetchMock as jest.Mock;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders the app', async () => {
    mockFetchMock.mockReturnValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockDataOneFile)
    });
    render(<App />);
    const appDiv = await screen.findByTestId('app');

    expect(appDiv).toBeVisible();
  });

  describe('Items', () => {
    it('renders the fetched data correctly', async () => {
      mockFetchMock.mockReturnValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDataOneFile)
      });

      render(<App />);

      const fileName = await screen.findByTestId('name');
      const filetype = screen.getByTestId('type');
      const dateAdded = screen.getByTestId('added');

      expect(fileName).toHaveTextContent('Employee Handbook');
      expect(filetype).toHaveTextContent('pdf');
      expect(dateAdded).toHaveTextContent('2017-01-06');
    });

    it('lists the folders as a button', async () => {
      mockFetchMock.mockReturnValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDataFolderWithFiles)
      });

      render(<App />);

      const folderButton = await screen.findByText('Expenses');
      expect(folderButton).toHaveRole('button');
    });

    it('clicking on a folder displays the contents below', async () => {
      mockFetchMock.mockReturnValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDataFolderWithFiles)
      });

      render(<App />);

      const folderButton = await screen.findByText('Expenses');

      let file = screen.queryByTestId('file-name');

      expect(file).not.toBeInTheDocument();

      fireEvent.click(folderButton);

      file = screen.getByTestId('file-name');

      expect(file).toBeInTheDocument();

      const fileName = await screen.findAllByTestId('name');
      const filetype = await screen.findByTestId('type');
      const dateAdded = await screen.findAllByTestId('added');

      expect(fileName[1]).toHaveTextContent('Expenses claim form');
      expect(filetype).toHaveTextContent('doc');
      expect(dateAdded[1]).toHaveTextContent('2017-05-02');
    });

    it('clicking on a folder hides the contents if it is already open', async () => {
      mockFetchMock.mockReturnValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDataFolderWithFiles)
      });

      render(<App />);

      const folderButton = await screen.findByText('Expenses');

      fireEvent.click(folderButton);

      const visibleFile = screen.getByTestId('file-name');

      expect(visibleFile).toBeInTheDocument();

      fireEvent.click(folderButton);

      const nonVisibleFile = screen.queryByTestId('file-name');

      expect(nonVisibleFile).not.toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    it('sorts the file and folders with folders at the top on load', async () => {
      mockFetchMock.mockReturnValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDataWithMultipleFilesAndFolders)
      });

      render(<App />);

      const items = await screen.findAllByTestId('name');

      expect(items[0]).toHaveTextContent('Expenses');
      expect(items[1]).toHaveTextContent('Misc');
      expect(items[4]).toHaveTextContent('Cost centres');
      expect(items[3]).toHaveTextContent('Public Holiday policy');
      expect(items[2]).toHaveTextContent('Employee Handbook');
    });
    it('sorts the file and folders by date when the Date button is clicked', async () => {
      mockFetchMock.mockReturnValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDataWithMultipleFilesAndFolders)
      });

      render(<App />);

      const dateButton = await screen.findByText('Date');

      fireEvent.click(dateButton);

      const items = await screen.findAllByTestId('name');

      expect(items[0]).toHaveTextContent('Misc');
      expect(items[3]).toHaveTextContent('Employee Handbook');
      expect(items[1]).toHaveTextContent('Cost centres');
      expect(items[2]).toHaveTextContent('Public Holiday policy');
      expect(items[4]).toHaveTextContent('Expenses');
    });

    it('sorts the file and folders by name when the Date button is clicked', async () => {
      mockFetchMock.mockReturnValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDataWithMultipleFilesAndFolders)
      });

      render(<App />);

      const nameButton = await screen.findByText('Name');

      fireEvent.click(nameButton);

      const items = await screen.findAllByTestId('name');

      expect(items[0]).toHaveTextContent('Cost centres');
      expect(items[1]).toHaveTextContent('Employee Handbook');
      expect(items[2]).toHaveTextContent('Expenses');
      expect(items[3]).toHaveTextContent('Misc');
      expect(items[4]).toHaveTextContent('Public Holiday policy');
    });

    it('sorts the file and folders by size when the Size button is clicked', async () => {
      mockFetchMock.mockReturnValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDataWithMultipleFilesAndFolders)
      });

      render(<App />);

      const sizeButton = await screen.findByText('Size');

      fireEvent.click(sizeButton);

      const items = await screen.findAllByTestId('name');

      expect(items[0]).toHaveTextContent('Employee Handbook');
      expect(items[1]).toHaveTextContent('Public Holiday policy');
      expect(items[2]).toHaveTextContent('Expenses');
      expect(items[3]).toHaveTextContent('Misc');
      expect(items[4]).toHaveTextContent('Cost centres');
    });

    it('sorts the file and folders back to default when the Rest button is clicked', async () => {
      mockFetchMock.mockReturnValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDataWithMultipleFilesAndFolders)
      });

      render(<App />);

      const sizeButton = await screen.findByText('Size');

      fireEvent.click(sizeButton);

      let items = await screen.findAllByTestId('name');

      expect(items[0]).toHaveTextContent('Employee Handbook');
      expect(items[1]).toHaveTextContent('Public Holiday policy');
      expect(items[2]).toHaveTextContent('Expenses');
      expect(items[3]).toHaveTextContent('Misc');
      expect(items[4]).toHaveTextContent('Cost centres');

      const resetButton = await screen.findByText('Reset');

      fireEvent.click(resetButton);

      items = await screen.findAllByTestId('name');

      expect(items[0]).toHaveTextContent('Expenses');
      expect(items[1]).toHaveTextContent('Misc');
      expect(items[4]).toHaveTextContent('Cost centres');
      expect(items[3]).toHaveTextContent('Public Holiday policy');
      expect(items[2]).toHaveTextContent('Employee Handbook');
    });
  });

  describe('Filtering', () => {
    it('filters the files and folders by name on the root level', async () => {
      mockFetchMock.mockReturnValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDataWithMultipleFilesAndFolders)
      });

      render(<App />);

      const filterInput = await screen.findByTestId('filter');

      fireEvent.change(filterInput, {
        target: { value: 'Expenses' }
      });

      const items = await screen.findAllByTestId('name');

      expect(items.length).toBe(1);
      expect(items[0]).toHaveTextContent('Expenses');
    });

    it('nested files and folders are included in the filter output', async () => {
      mockFetchMock.mockReturnValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDataWithMultipleFilesAndFolders)
      });

      render(<App />);

      const filterInput = await screen.findByTestId('filter');

      fireEvent.change(filterInput, {
        target: { value: 'm' }
      });

      const items = await screen.findAllByTestId('name');

      expect(items[0]).toHaveTextContent('Expenses'); // folder containing an 'm' file
      fireEvent.click(items[0].getElementsByTagName('button')[0]);
      expect(screen.getByText('Expenses claim form')).toBeInTheDocument();

      expect(items[1]).toHaveTextContent('Misc');
      fireEvent.click(items[1].getElementsByTagName('button')[0]);
      expect(screen.getByText('Welcome to the company!')).toBeInTheDocument();

      expect(items[2]).toHaveTextContent('Employee Handbook');
    });
  });
});
