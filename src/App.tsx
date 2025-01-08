import { useEffect, useState } from 'react';
import './App.css';
import fetchMock from './helpers/fetchMock';
import filesAndFolders from './api';
import sortFilesAndFolders from './helpers/sortFilesAndFolders';
import { FileItem } from './types';
import ItemList from './components/ItemList';

function App() {
  const [data, setData] = useState<FileItem[]>([]);

  useEffect(() => {
    const fetchData = async (data: Object) => {
      const response = await fetchMock(data);
      const json = await response.json();
      const sortedArray = sortFilesAndFolders(json);
      setData(sortedArray);
    };

    fetchData(filesAndFolders);
  }, []);

  return <div data-testid="app">{data && <ItemList items={data} />}</div>;
}

export default App;
