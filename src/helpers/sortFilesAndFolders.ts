import { DataItem } from '../types';
import {
  DATE_ATTRIBUTE,
  FOLDER,
  NAME_ATTRIBUTE,
  SIZE_ATTRIBUTE
} from '../constants';

const sortByFolder = (a: DataItem, b: DataItem) => {
  if (a.type === FOLDER && b.type !== FOLDER) {
    return -1;
  } else if (a.type !== FOLDER && b.type == FOLDER) {
    return 1;
  }
  return 0;
};

const sortByDate = (a: DataItem, b: DataItem) => {
  return Date.parse(a.added) - Date.parse(b.added);
};

const sortByName = (a: DataItem, b: DataItem) => {
  return a.name.localeCompare(b.name);
};

const recursiveSort = (
  array: DataItem[],
  attribute: string,
  sortFunction: (a: DataItem, b: DataItem) => number
): DataItem[] => {
  return array
    .map((item: DataItem) => {
      if (item.type === FOLDER && 'files' in item) {
        return {
          ...item,
          files: item.files ? recursiveSort(item.files, attribute, sortFunction) : []
        };
      }
      return item;
    })
    .sort(sortFunction);
};

const sortBySize = (a: DataItem, b: DataItem) => {
  const aAsNumber = parseFloat(a.size.substring(0, a.size.length - 3));
  const bAsNumber = parseFloat(b.size.substring(0, b.size.length - 3));
  return bAsNumber - aAsNumber;
};

const sortByAttribute = (array: DataItem[], attribute = '') => {
  if (attribute === DATE_ATTRIBUTE) {
    return recursiveSort(array, attribute, sortByDate);
  } else if (attribute === NAME_ATTRIBUTE) {
    return recursiveSort(array, attribute, sortByName);
  } else if (attribute === SIZE_ATTRIBUTE) {
    return recursiveSort(array, attribute, sortBySize);
  }
  return array;
};

export const sortFilesAndFolders = (array: DataItem[], attribute = '') => {
  if (attribute !== '') {
    return sortByAttribute(array, attribute);
  }
  return array.sort(sortByFolder);
};
