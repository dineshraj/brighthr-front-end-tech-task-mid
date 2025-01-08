import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import Folder from '../../src/components/Folder';

const mockData = 
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
  }

describe('Folder', () => {
  it('lists the folder given as a button with correct text', () => { 
    render(<Folder folder={mockData} />)

    const name = screen.getByTestId('name');
    const type = screen.getByTestId('type'); 

    const folderButton = screen.getByText('Expenses');
    expect(folderButton).toHaveRole('button');

    expect(name).toHaveTextContent('Expenses')
    expect(type).toHaveTextContent('folder');
  });
  
  it('does not render any files on initial render', () => {
    render(<Folder folder={mockData} />);

    const files = screen.queryByTestId('files');

    expect(files).not.toBeInTheDocument();
  })

  it.skip('clicking the button calls the click handler', () => {});
});
