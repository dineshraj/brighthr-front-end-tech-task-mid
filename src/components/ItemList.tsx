import { useState } from 'react';
import { DataItem, FileItem, FolderItem } from '../types';

import File from './File';
import Folder from './Folder';

interface ItemListProps {
  items: DataItem[] | undefined;
}

const ItemList = ({ items }: ItemListProps) => {
  const [folderToOpen, setFolderToOpen] = useState('');

  const handleFolderClick = (folderId: string) => {
    console.log('clicky click with', folderId);
    
    setFolderToOpen(folderId);
  }


  return (
    <ul data-testid="file-list">
      {items && items.map((item: DataItem, i: number) => (
        <li key={i}>
          {item.type === 'folder' ? (
            <Folder
              folder={item as FolderItem}
              clickHandler={handleFolderClick}
              folderToOpen={folderToOpen}
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