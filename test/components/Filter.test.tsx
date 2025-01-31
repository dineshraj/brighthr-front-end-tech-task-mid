import { fireEvent, render, screen } from '@testing-library/react';
import Filter from '../../src/components/Filter';
import { vi } from 'vitest';

describe('Filter', () => {
  it('renders the filter input', async () => {
    render(<Filter handleOnChange={() => {}} filter={''} />);

    const filter = await screen.findByTestId('filter');
    expect(filter).toHaveClass('filter');
  });

  it('cchanging click handler', async () => {
    const changeMock = vi.fn();

    render(<Filter handleOnChange={changeMock} filter={''} />);

    const filter = await screen.findByTestId('filter');
    fireEvent.change(filter, {
      target: { value: 'hello' }
    });

    expect(changeMock).toHaveBeenCalled();
  });
});
