import { FolderItem } from '../types';
import ItemList from './ItemList';

const Folder = ({ folder }: { folder: FolderItem }) => {
  return (
    <ul data-testid="folder">
      <li data-testid="name">
        <button className="folder-button">{folder.name}</button>
      </li>
      {idToOpen === folder.id && (
        <ItemList items={folder.files} />
      )}
    </ul>
  );
};

export default Folder;
