import { DataItem } from '../types';

import File from './File';
import Folder from './Folder';

interface ItemListProps {
  items: DataItem[]
}

const ItemList = ({ items }: ItemListProps) => {
  return (
    <>
      {items.map((item: any, i: number) => (
        <li key={i}>
          {item.type !== 'folder' ? (
            <File file={item} />
          ) : (
            <Folder folder={item} />
          )}
          {/* <ul>
            <li className="name" data-testid="name">
              {item.type !== 'folder' ? (
                item.name
              ) : (
                <button className="folder-button">{item.name}</button>
              )}
            </li>
            {item.type !== 'folder' && (
              <li data-testid="filetype">
                <span>Filetype: </span>
                {item.type}
              </li>
            )}
            {item.added && (
              <li data-testid="date-added">
                <span>Date Added: </span>
                {item.added}
              </li>
            )}
          </ul> */}
        </li>
      ))}
    </>
  );
};

export default ItemList;
