import { useState } from 'react';
import { DataItem, FileItem, FolderItem } from '../types';

import File from './File';
import Folder from './Folder';
import { FOLDER } from '../constants';

interface ItemListProps {
  items: DataItem[];
  filter: string;
}

const ItemList = ({ items, filter }: ItemListProps) => {
  const [folderToOpen, setFolderToOpen] = useState('');

  const handleFolderClick = (folderId: string) => {
    // if folderToOpen is the same as folderId that is being clicked then set folderToOpen to an empty string
    // this toggles the folder open and closed
    if (folderToOpen === folderId) {
      setFolderToOpen('');
      return;
    }
    setFolderToOpen(folderId);
  };

  const filterName = (item: FileItem, filter: string) => {
    return item.name.toLowerCase().includes(filter.toLowerCase());
  };

  const filterFolder = (item: FolderItem, filter: string) => {
    const folderFiles = item.files || [];
    const folderMatches = filterName(item, filter);
    const fileMatches = folderFiles.filter((file) => filterName(file, filter));

    // Neither folder or internal files match so do not render
    if (!folderMatches && fileMatches.length === 0) {
      return false;
    }

    return true;
  };

  return (
    <ul className="file-list" data-testid="file-list">
      {items &&
        items.map((item: DataItem, i: number) => {
          return (
            <li key={i}>
              {item.type === FOLDER
                ? filterFolder(item as FolderItem, filter) && (
                    <Folder
                      folder={item as FolderItem}
                      clickHandler={handleFolderClick}
                      folderToOpen={folderToOpen}
                      filter={filter}
                    />
                  )
                : filterName(item, filter) && <File file={item as FileItem} />}
            </li>
          );
        })}
    </ul>
  );
};

export default ItemList;
