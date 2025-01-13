import { useEffect, useState } from 'react';
import './App.css';
import fetchMock from './helpers/fetchMock';
import filesAndFolders from './api';
import { DataItem } from './types';
import ItemList from './components/ItemList';
import SortButton from './components/SortButton';

import { sortFilesAndFolders }  from './helpers/sortFilesAndFolders';

function App() {
  const [data, setData] = useState<DataItem[]>([]);
  
  useEffect(() => {
    const fetchData = async (data: Object) => {
      const response = await fetchMock(data);
      const json = await response.json();
      const sortedData = sortFilesAndFolders(json);
      setData(sortedData);
    };
    
    fetchData(filesAndFolders);
  }, []);
  
  const sortBy = (attribute: string) => {
    const sortedData = sortFilesAndFolders(data, attribute);
    setData([...sortedData]);
  }

  return (
    <div data-testid="app">
      {data.length > 0 && (
        <>
          <div className="sort">
            <span className="sort__text">Sort by:</span>
            <SortButton handleOnClick={sortBy}>Date</SortButton>
            <SortButton handleOnClick={sortBy}>Name</SortButton>
            <SortButton handleOnClick={sortBy}>Size</SortButton>
          </div>
          <ItemList items={data} />
        </>
      )}
    </div>
  );
}

export default App;
