import { render, screen } from "@testing-library/react";
import SortButton from "../../src/components/SortButton";
import { vi } from "vitest";

describe('SortButton', () => {
  it('renders the button with the correct text', () => {
    render(<SortButton handleOnClick={() => { }}>Date</SortButton>);

    const button = screen.getByText('Date');
    expect(button).toHaveClass('sort-button');
  });

  it('clicking the button calls the click handler', async () => {
    const clickMock = vi.fn();

    render(<SortButton handleOnClick={clickMock}>Date</SortButton>);

    const button = await screen.findByText('Date');
    expect(clickMock).not.toHaveBeenCalled();
    button.click();
    expect(clickMock).toHaveBeenCalled();
  })
});