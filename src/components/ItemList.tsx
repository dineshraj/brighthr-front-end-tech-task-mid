import { DataItem } from '../types';

import File from './File';
import Folder from './Folder';

interface ItemListProps {
  items: DataItem[];
}

const ItemList = ({ items }: ItemListProps) => {
  // TODO TYPE
  return (
    <ul data-testid="file-list">
      {items.map((item: any, i: number) => (
        <li key={i}>
          {item.type === 'folder' ? (
            <Folder folder={item} click={ } idToOpen={ } />
          ) : (
            <File file={item} />
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