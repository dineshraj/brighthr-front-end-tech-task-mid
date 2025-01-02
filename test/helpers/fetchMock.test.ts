import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fetchMock from '../../src/helpers/fetchMock';
import { act } from 'react';

const mockData = {
  type: 'pdf',
  name: 'Employee Handbook',
  added: '2017-01-06',
};

describe('fetchMock', () => {

  beforeEach(() => {
    vi.useFakeTimers();
  })

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the data provided', async () => {
    const fetchPromise = fetchMock(mockData);
    vi.runAllTimers();
    const response = (await fetchPromise) as unknown as Response;

    expect(response.ok).toBe(true);
    const data = await response.json();

    expect(data).toStrictEqual(mockData);
  });

  it('waits for the timeout before returning', async () => {
    vi.useFakeTimers();
    const fetchPromise = fetchMock(mockData);
    let resolved = false;

    fetchPromise.then(() => {
      resolved = true;
    });

    await Promise.resolve(); // Allow pending promises to settle
    expect(resolved).toBe(false);

    vi.advanceTimersByTime(1000);

    await Promise.resolve();
    expect(resolved).toBe(true);
  });
});
