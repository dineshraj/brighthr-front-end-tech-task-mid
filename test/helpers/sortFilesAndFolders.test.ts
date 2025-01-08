import { describe, expect, it } from 'vitest';
import sortFilesAndFolders from '../../src/helpers/sortFilesAndFolders';

const mockData = [
  {
    type: 'pdf',
    name: 'Employee Handbook',
    added: '2017-01-06',
  },
  {
    type: 'folder',
    name: 'Employee Handbook',
    added: '2017-01-06',
  },
  {
    type: 'jpeg',
    name: 'Employee Handbook',
    added: '2017-01-06',
  },
  {
    type: 'folder',
    name: 'Employee Handbook',
    added: '2017-01-06',
  },
];
describe('sortFilesAndFolders', () => {
  it('returns the sorted data', async () => {
    const sortedArray = sortFilesAndFolders(mockData);

    const expectedOutput = [
      {
        type: 'folder',
        name: 'Employee Handbook',
        added: '2017-01-06',
      },
      {
        type: 'folder',
        name: 'Employee Handbook',
        added: '2017-01-06',
      },
      {
        type: 'pdf',
        name: 'Employee Handbook',
        added: '2017-01-06',
      },

      {
        type: 'jpeg',
        name: 'Employee Handbook',
        added: '2017-01-06',
      },
    ];

    expect(sortedArray).toStrictEqual(expectedOutput);
  });
});
