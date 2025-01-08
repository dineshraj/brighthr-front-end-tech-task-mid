import { FileItem } from '../types';

const File = ({ file }: { file: FileItem }) => {
  return (
    <ul data-testid="file">
      <li className="name" data-testid="name">
        {file.name}
      </li>
      <li className="type" data-testid="type">
        {file.type}
      </li>
      <li className="added" data-testid="added">
        {file.added}
      </li>
    </ul>
  );
};

export default File;
