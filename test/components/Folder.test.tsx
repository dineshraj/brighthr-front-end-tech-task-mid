import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Folder from '../../src/components/Folder';
import { DataItem } from '../../src/types';

const mockData: DataItem = 
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
  }

describe('Folder', () => {
  it('lists the folder given as a button with correct information', () => { 
    render(<Folder folder={mockData} clickHandler={() => {}}  folderToOpen='1'/>)

    const name = screen.getByTestId('folder-name');

    const folderButton = screen.getByText('Expenses');
    const added = screen.getByTestId('added');
    expect(folderButton).toHaveRole('button');

    expect(name).toHaveTextContent('Expenses')
    expect(added).toHaveTextContent('2023-12-22');
  });
  
  it('does not render any files on initial render', () => {
    render(
      <Folder folder={mockData} clickHandler={() => {}} folderToOpen="" />
    );

    const files = screen.queryByTestId('files');

    expect(files).not.toBeInTheDocument();
  })

  it('clicking the button calls the click handler', async () => {
    const clickMock = vi.fn();
  
    render(<Folder folder={mockData} clickHandler={clickMock} folderToOpen="" />);
  
    const folderButton = await screen.findByTestId('folder-button');
    expect(clickMock).not.toHaveBeenCalled();
    folderButton.click();
    expect(clickMock).toHaveBeenCalled();
  });
});
