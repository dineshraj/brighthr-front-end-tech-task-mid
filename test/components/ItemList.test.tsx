import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ItemList from '../../src/components/ItemList';

const mockData = [
  {
    type: 'png',
    name: 'Employee Handbook',
    added: '2042-23-23',
  },
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

describe('ItemList', () => {
  it('renders the list of items provided', async () => {
    render(<ItemList items={mockData} />);

    const items = await screen.getAllByTestId('name');
    expect(items).toHaveLength(2);
  });

  it.skip('only passes files to the File component', async () => {
    render(<ItemList items={mockData} />);
  });

  it.skip('only passes folders to the Folders component', async () => {
    render(<ItemList items={mockData} />);
  });
});
