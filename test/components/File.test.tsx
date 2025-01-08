import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import File from '../../src/components/File';

const mockData = {
  type: 'png',
  name: 'Compromising pic of boss',
  added: '2017-01-06',
};

describe('File', () => {
  it('renders the file given corrently', () => {
    render(<File file={mockData} />);

    const name = screen.getByTestId('name');
    const type = screen.getByTestId('type');
    const added = screen.getByTestId('added');

    expect(name).toHaveTextContent('Compromising pic of boss');
    expect(type).toHaveTextContent('png');
    expect(added).toHaveTextContent('2017-01-06');
  });
});
