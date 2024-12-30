import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from '../src/App';

describe('App', () => {
  it('renders the app', async () => {
    render(<App />);
    const appDiv = await screen.findByTestId('app');
    expect(appDiv).toBeVisible();
  });
});
