import { useState } from 'react';
import { DataItem, FileItem, FolderItem } from '../types';

import File from './File';
import Folder from './Folder';
import { FOLDER } from '../constants';

interface ItemListProps {
  items: DataItem[];
  filter: string
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
  }


  return (
    <ul className="file-list" data-testid="file-list">
      {items && items.map((item: DataItem, i: number) => (
        item.name.toLowerCase().includes(filter.toLowerCase()) &&
        <li key={i}>
          {item.type === FOLDER ? (
            <Folder
              folder={item as FolderItem}
              clickHandler={handleFolderClick}
                folderToOpen={folderToOpen}
                filter={filter}
            />
          ) : (
            <File file={item as FileItem} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;

/*
  Have a click handler here that is passed into Folder.
  When it is clicked, it sets state of the folder to open (via the id)
  Pass the set id into the folder component
  If the set id matches the folder currently being rendered then
    the Folder component will call the ItemList component again with the new array
  This SHOULD ensure infinite recursion too.
*/