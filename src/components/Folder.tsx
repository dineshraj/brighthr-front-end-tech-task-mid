import { FolderItem } from '../types';

const Folder = ({ folder }: { folder: FolderItem }) => {
  return (
    <ul data-testid="folder">
      <li data-testid="name">
        <button className="folder-button">{folder.name}</button>
      </li>
      <li data-testid="type">{folder.type}</li>
    </ul>
  );
};

export default Folder;
