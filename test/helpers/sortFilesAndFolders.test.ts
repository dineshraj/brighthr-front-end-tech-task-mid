import { describe, expect, it } from 'vitest';
import { sortFilesAndFolders } from '../../src/helpers/sortFilesAndFolders';
import { DataItem } from '../../src/types';
import {
  DATE_ATTRIBUTE,
  NAME_ATTRIBUTE,
  SIZE_ATTRIBUTE
} from '../../src/constants';

const mockData: DataItem[] = [
  {
    type: 'pdf',
    name: 'Employee Handbook',
    added: '2017-01-06',
    size: '3.2 MB'
  },
  {
    type: 'folder',
    name: 'Porn',
    added: '2019-01-06',
    size: '1.2 MB'
  },
  {
    type: 'jpeg',
    name: 'the boss',
    added: '2020-07-06',
    size: '2.2 MB'
  },
  {
    type: 'folder',
    name: 'misc',
    added: '2020-01-06',
    size: '12.2 MB'
  }
];

describe('sortFilesAndFolders', () => {
  it('returns the sorted data with folders at top by default', async () => {
    const sortedArray = sortFilesAndFolders(mockData);

    const expectedOutput = [
      {
        type: 'folder',
        name: 'Porn',
        added: '2019-01-06',
        size: '1.2 MB'
      },
      {
        type: 'folder',
        name: 'misc',
        added: '2020-01-06',
        size: '12.2 MB'
      },
      {
        type: 'pdf',
        name: 'Employee Handbook',
        added: '2017-01-06',
        size: '3.2 MB'
      },

      {
        type: 'jpeg',
        name: 'the boss',
        added: '2020-07-06',
        size: '2.2 MB'
      }
    ];

    expect(sortedArray).toStrictEqual(expectedOutput);
  });

  it('returns the sorted data by date', async () => {
    const sortedArray = sortFilesAndFolders(mockData, DATE_ATTRIBUTE);

    const expectedOutput = [
      {
        type: 'pdf',
        name: 'Employee Handbook',
        added: '2017-01-06',
        size: '3.2 MB'
      },
      {
        type: 'folder',
        name: 'Porn',
        added: '2019-01-06',
        size: '1.2 MB'
      },
      {
        type: 'folder',
        name: 'misc',
        added: '2020-01-06',
        size: '12.2 MB'
      },
      {
        type: 'jpeg',
        name: 'the boss',
        added: '2020-07-06',
        size: '2.2 MB'
      }
    ];

    expect(sortedArray).toStrictEqual(expectedOutput);
  });

  it('returns the sorted data by name', async () => {
    const sortedArray = sortFilesAndFolders(mockData, NAME_ATTRIBUTE);

    const expectedOutput = [
      {
        type: 'pdf',
        name: 'Employee Handbook',
        added: '2017-01-06',
        size: '3.2 MB'
      },
      {
        type: 'folder',
        name: 'misc',
        added: '2020-01-06',
        size: '12.2 MB'
      },
      {
        type: 'folder',
        name: 'Porn',
        added: '2019-01-06',
        size: '1.2 MB'
      },
      {
        type: 'jpeg',
        name: 'the boss',
        added: '2020-07-06',
        size: '2.2 MB'
      }
    ];

    expect(sortedArray).toStrictEqual(expectedOutput);
  });

  it('returns the sorted data by size', async () => {
    const sortedArray = sortFilesAndFolders(mockData, SIZE_ATTRIBUTE);

    const expectedOutput = [
      {
        type: 'folder',
        name: 'misc',
        added: '2020-01-06',
        size: '12.2 MB'
      },
      {
        type: 'pdf',
        name: 'Employee Handbook',
        added: '2017-01-06',
        size: '3.2 MB'
      },
      {
        type: 'jpeg',
        name: 'the boss',
        added: '2020-07-06',
        size: '2.2 MB'
      },
      {
        type: 'folder',
        name: 'Porn',
        added: '2019-01-06',
        size: '1.2 MB'
      }
    ];

    expect(sortedArray).toStrictEqual(expectedOutput);
  });

  it('returns sorted data by name including files within nested folders', async () => {
    const mockDataWithFolders = [
      ...mockData,
      {
        type: 'folder',
        name: 'Expenses',
        added: '2017-01-06',
        size: '1.2 MB',
        files: [
          {
            type: 'doc',
            name: 'Fuel allowances',
            added: '2017-05-03',
            size: '0.2 MB'
          },
          {
            type: 'doc',
            name: 'Expenses claim form',
            added: '2017-05-02',
            size: '0.3 MB'
          }
        ]
      }
    ];
    const expectedOutput = [
      {
        type: 'pdf',
        name: 'Employee Handbook',
        added: '2017-01-06',
        size: '3.2 MB'
      },
      {
        type: 'folder',
        name: 'Expenses',
        added: '2017-01-06',
        size: '1.2 MB',
        files: [
          {
            type: 'doc',
            name: 'Expenses claim form',
            added: '2017-05-02',
            size: '0.3 MB'
          },
          {
            type: 'doc',
            name: 'Fuel allowances',
            added: '2017-05-03',
            size: '0.2 MB'
          }
        ]
      },
      {
        type: 'folder',
        name: 'misc',
        added: '2020-01-06',
        size: '12.2 MB'
      },
      {
        type: 'folder',
        name: 'Porn',
        added: '2019-01-06',
        size: '1.2 MB'
      },
      {
        type: 'jpeg',
        name: 'the boss',
        added: '2020-07-06',
        size: '2.2 MB'
      }
    ];
    const sortedArray = sortFilesAndFolders(
      mockDataWithFolders,
      NAME_ATTRIBUTE
    );

    expect(sortedArray).toStrictEqual(expectedOutput);
  });

  it('returns sorted data by size including files within nested folders', async () => {
    const mockDataWithFolders = [
      ...mockData,
      {
        type: 'folder',
        name: 'Expenses',
        added: '2017-01-06',
        size: '3.1 MB',
        files: [
          {
            type: 'doc',
            name: 'Fuel allowances',
            added: '2017-05-03',
            size: '0.2 MB'
          },
          {
            type: 'doc',
            name: 'Expenses claim form',
            added: '2017-05-02',
            size: '0.3 MB'
          }
        ]
      }
    ];
    const expectedOutput = [
      {
        type: 'folder',
        name: 'misc',
        added: '2020-01-06',
        size: '12.2 MB'
      },
      {
        type: 'pdf',
        name: 'Employee Handbook',
        added: '2017-01-06',
        size: '3.2 MB'
      },
      {
        type: 'folder',
        name: 'Expenses',
        added: '2017-01-06',
        size: '3.1 MB',
        files: [
          {
            type: 'doc',
            name: 'Expenses claim form',
            added: '2017-05-02',
            size: '0.3 MB'
          },
          {
            type: 'doc',
            name: 'Fuel allowances',
            added: '2017-05-03',
            size: '0.2 MB'
          }
        ]
      },
      {
        type: 'jpeg',
        name: 'the boss',
        added: '2020-07-06',
        size: '2.2 MB'
      },
      {
        type: 'folder',
        name: 'Porn',
        added: '2019-01-06',
        size: '1.2 MB'
      }
    ];
    const sortedArray = sortFilesAndFolders(
      mockDataWithFolders,
      SIZE_ATTRIBUTE
    );

    expect(sortedArray).toStrictEqual(expectedOutput);
  });

  it('returns sorted data by date including files within nested folders', async () => {
    const mockDataWithFolders = [
      ...mockData,
      {
        type: 'folder',
        name: 'Expenses',
        added: '2017-02-06',
        size: '3.1 MB',
        files: [
          {
            type: 'doc',
            name: 'Expenses claim form',
            added: '2017-05-02',
            size: '0.3 MB'
          },
          {
            type: 'doc',
            name: 'Fuel allowances',
            added: '2017-05-03',
            size: '0.2 MB'
          }
        ]
      }
    ];
    const expectedOutput = [
      {
        type: 'pdf',
        name: 'Employee Handbook',
        added: '2017-01-06',
        size: '3.2 MB'
      },
      {
        type: 'folder',
        name: 'Expenses',
        added: '2017-02-06',
        size: '3.1 MB',
        files: [
          {
            type: 'doc',
            name: 'Expenses claim form',
            added: '2017-05-02',
            size: '0.3 MB'
          },
          {
            type: 'doc',
            name: 'Fuel allowances',
            added: '2017-05-03',
            size: '0.2 MB'
          }
        ]
      },
      {
        type: 'folder',
        name: 'Porn',
        added: '2019-01-06',
        size: '1.2 MB'
      },
      {
        type: 'folder',
        name: 'misc',
        added: '2020-01-06',
        size: '12.2 MB'
      },
      {
        type: 'jpeg',
        name: 'the boss',
        added: '2020-07-06',
        size: '2.2 MB'
      }
    ];
    const sortedArray = sortFilesAndFolders(
      mockDataWithFolders,
      DATE_ATTRIBUTE
    );

    expect(sortedArray).toStrictEqual(expectedOutput);
  });
});
