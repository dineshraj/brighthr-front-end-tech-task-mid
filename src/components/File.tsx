import { FileItem } from '../types';

import '../styles/File.css';


const File = ({ file }: { file: FileItem }) => {
  return (
    <ul data-testid="file-name">
      <li className="name file" data-testid="name">
        {file.name}
      </li>
      <li className="type" data-testid="type">
        {file.type}
      </li>
      <li className="added" data-testid="added">
        {file.added}
      </li>
      <li className="size" data-testid="size">
        {file.size}
      </li>
    </ul>
  );
};

export default File;
