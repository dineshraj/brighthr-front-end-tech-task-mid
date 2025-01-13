import { fireEvent, render, screen } from '@testing-library/react';

import ItemList from '../../src/components/ItemList';

const mockData = [
  {
    type: 'png',
    name: 'Employee Handbook',
    added: '2042-23-23',
    size: '3.2 MB',
  },
  {
    id: '2',
    type: 'folder',
    name: 'Expenses',
    size: '1.2 MB',
    added: '2023-12-22',
    files: [
      {
        type: 'doc',
        name: 'Expenses claim form',
        added: '2017-05-02',
        size: '0.3 MB',
      },
      {
        type: 'doc',
        name: 'Fuel allowances',
        added: '2017-05-03',
        size: '0.2 MB',
      },
    ],
  },
];

describe('ItemList', () => {
  it('renders the list of items provided', async () => {
    render(<ItemList items={mockData} />);

    const files = screen.getAllByTestId('file-name');
    const folders = screen.getAllByTestId('folder-name');
    expect(files).toHaveLength(1);
    expect(folders).toHaveLength(1);
  });

  it('only passes files to the File component', async () => {
    render(<ItemList items={mockData} />);

    const items = screen.getAllByTestId('file-name');
    expect(items).toHaveLength(1);
  });

  it('only passes folders to the Folders component', async () => {
    render(<ItemList items={mockData} />);

    const items = screen.getAllByTestId('folder-name');
    expect(items).toHaveLength(1);
  });

  it('if folder is already open and is clicked it hides the files', async () => {
    render(<ItemList items={mockData} />);

    expect(screen.queryByText('Expenses claim form')).not.toBeInTheDocument();

    const folderButton = await screen.findByTestId('folder-button');
    fireEvent.click(folderButton);

    expect(screen.getByText('Expenses claim form')).toBeVisible();

    fireEvent.click(folderButton);

    expect(screen.queryByText('Expenses claim form')).not.toBeInTheDocument();
  });
});
