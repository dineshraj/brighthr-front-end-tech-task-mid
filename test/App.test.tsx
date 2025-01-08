import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import App from '../src/App';
import fetchMock from '../src/helpers/fetchMock';

const mockDataOneFile = [
  {
    type: 'pdf',
    name: 'Employee Handbook',
    added: '2017-01-06',
  },
];

const mockDataOneFolder = [
  {
    type: 'folder',
    name: 'Employee Handbook',
  },
];

const mockDataFolderWithFiles = [
  {
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
  }
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
      json: () => Promise.resolve(),
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
    const filetype = await screen.findByTestId('filetype');
    const dataAdded = await screen.findByTestId('date-added');

    expect(fileName).toHaveTextContent('Employee Handbook');
    expect(filetype).toHaveTextContent('pdf');
    expect(dataAdded).toHaveTextContent('2017-01-06');
  });

  it('does not display the added field if the listing is a folder', async () => {
    mockFetchMock.mockReturnValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockDataOneFolder),
    });

    render(<App />);

    await waitFor(() => {
      const dataAdded = screen.queryByTestId('date-added');
      expect(dataAdded).not.toBeInTheDocument();
    });
  });

  it('lists the files in a folder', async () => {
    mockFetchMock.mockReturnValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockDataFolderWithFiles),
    });

    render(<App />);

    const folder = await screen.findByText('Expenses');
    expect(folder).toHaveRole('button');
  });
});
