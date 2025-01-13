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

const sortBySize = (a: DataItem, b: DataItem) => {
  const aAsNumber = parseFloat(a.size.substring(0, a.size.length - 3));
  const bAsNumber = parseFloat(b.size.substring(0, b.size.length - 3));
  return bAsNumber - aAsNumber;
};

const sortByAttribute = (array: DataItem[], attribute = '') => {
  console.log('sortByAttribute');

  if (attribute === DATE_ATTRIBUTE) {
    return array.sort(sortByDate);
  } else if (attribute === NAME_ATTRIBUTE) {
    return array.sort(sortByName);
  } else if (attribute === SIZE_ATTRIBUTE) {
    return array.sort(sortBySize);
  }
  return array;
};

export const sortFilesAndFolders = (array: DataItem[], attribute = '') => {
  console.log('🚀 ~ sortFilesAndFolders ~ attribute:', attribute);
  if (attribute !== '') {
    console.log('I have the attribute', attribute);

    return sortByAttribute(array, attribute);
  }
  return array.sort(sortByFolder);
};
