import { FolderItem } from '../types';
import ItemList from './ItemList';

import '../styles/Folder.css';

interface FolderProps {
  folder: FolderItem;
  clickHandler: (arg0: string) => void;
  folderToOpen: boolean | string;
  filter: string;
}

const Folder = ({ folder, clickHandler, folderToOpen, filter }: FolderProps) => {
  return (
    <ul data-testid="folder-name">
      <li data-testid="name">
        <button
          className="folder-button"
          data-testid="folder-button"
          onClick={() => clickHandler(folder.id)}
        >
          {folder.name}
        </button>
      </li>
      <li data-testid="added">{folder.added}</li>
      <li data-testid="size">{folder.size}</li>
      {folder.files && folderToOpen === folder.id && (
        <li>
          <ItemList items={folder.files} filter={filter} />
        </li>
      )}
    </ul>
  );
};

export default Folder;
