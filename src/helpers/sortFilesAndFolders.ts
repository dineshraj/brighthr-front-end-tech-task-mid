import { FileItem } from "../types";

const sortFunction = (a: FileItem, b: FileItem) => {
  if (a.type === 'folder' && b.type !== 'folder') {
    return -1;
  } else if (a.type !== 'folder' && b.type == 'folder') {
    return 1;
  }
  return 0;
};

const sortFilesAndFolders = (array: FileItem[]) => {
  return array.sort(sortFunction);
};

export default sortFilesAndFolders;
