import { DataItem } from "../types";

const filesAndFolders: DataItem[] = [
  {
    type: 'pdf',
    name: 'Employee Handbook',
    added: '2017-01-06',
    size: '3.2 MB'
  },
  {
    type: 'pdf',
    name: 'Public Holiday policy',
    added: '2016-12-06',
    size: '1.4 MB'
  },
  {
    id: '1',
    type: 'folder',
    name: 'Expenses',
    added: '2017-01-06',
    size: '1.2 MB',
    files: [
      {
        type: 'doc',
        name: 'More expenses claim form',
        added: '2017-05-12',
        size: '0.3 MB'
      },
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
    type: 'csv',
    name: 'Cost centres',
    added: '2016-08-12',
    size: '0.1 MB'
  },
  {
    id: '2',
    type: 'folder',
    name: 'Misc',
    size: '0.5 MB',
    added: '2017-03-06',
    files: [
      {
        type: 'doc',
        name: 'Christmas party',
        added: '2017-12-01',
        size: '0.4 MB'
      },
      {
        type: 'mov',
        name: 'Welcome to the company!',
        added: '2015-04-24',
        size: '0.1 MB'
      }
    ]
  }
];

export default filesAndFolders;
