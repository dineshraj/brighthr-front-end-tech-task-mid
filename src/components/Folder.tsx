import { FolderItem } from '../types';
import ItemList from './ItemList';

interface FolderProps {
  folder: FolderItem;
  clickHandler: (arg0: string) => void;
  folderToOpen: string;
}

const Folder = ({ folder, clickHandler, folderToOpen }: FolderProps) => {
  const hasNestedFolderThatShouldBeOpened =
    folder.files && folderToOpen === folder.id;

  return (
    <ul data-testid="folder">
      <li data-testid="name">
        <button
          className="folder-button"
          data-testid="folder-button"
          onClick={() => clickHandler(folder.id)}
        >
          {folder.name}
        </button>
      </li>
      {hasNestedFolderThatShouldBeOpened && <li><ItemList items={folder.files} /></li>}
    </ul>
  );
};

export default Folder;
