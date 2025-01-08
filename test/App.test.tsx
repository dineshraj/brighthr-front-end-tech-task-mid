import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from '../src/App';
import fetchMock from '../src/helpers/fetchMock';

const mockDataOneFile = [
  {
    type: 'pdf',
    name: 'Employee Handbook',
    added: '2017-01-06',
  },
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
        added: '2017-05-02',
      },
      {
        type: 'doc',
        name: 'Fuel allowances',
        added: '2017-05-03',
      },
    ],
  },
];

describe('App', () => {
  let mockFetchMock: jest.Mock;

  beforeEach(() => {
    vi.mock('../src/helpers/fetchMock', () => {
      return {
        default: vi.fn(),
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
      json: () => Promise.resolve(mockDataOneFile),
    });
    render(<App />);
    const appDiv = await screen.findByTestId('app');

    expect(appDiv).toBeVisible();
  });

  it('renders the fetched data correctly', async () => {
    mockFetchMock.mockReturnValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockDataOneFile),
    });

    render(<App />);

    const fileName = await screen.findByTestId('name');
    const filetype = await screen.findByTestId('type');
    const dateAdded = await screen.findByTestId('added');

    expect(fileName).toHaveTextContent('Employee Handbook');
    expect(filetype).toHaveTextContent('pdf');
    expect(dateAdded).toHaveTextContent('2017-01-06');
  });

  it('lists the folders as a button', async () => {
    mockFetchMock.mockReturnValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockDataFolderWithFiles),
    });

    render(<App />);

    const folderButton = await screen.findByText('Expenses');
    expect(folderButton).toHaveRole('button');
  });

  it.skip('clicking on a folder displays the contents below', async () => {
    mockFetchMock.mockReturnValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockDataFolderWithFiles),
    });

    render(<App />);

    const folderButton = await screen.findByText('Expenses');
    folderButton.click();
  });
});