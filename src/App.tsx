import { useEffect, useState } from 'react';
import './App.css';
import fetchMock from './helpers/fetchMock';
import filesAndFolders from './api';
import { DataItem } from './types';
import ItemList from './components/ItemList';
import SortButton from './components/SortButton';

import { sortFilesAndFolders } from './helpers/sortFilesAndFolders';
import Filter from './components/Filter';
import Sort from './components/Sort';

function App() {
  const [data, setData] = useState<DataItem[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async (data: Object) => {
      const response = await fetchMock(data);
      const json = await response.json();
      const sortedData = sortFilesAndFolders(json);
      setData(sortedData);
    };

    fetchData(filesAndFolders);
  }, []);

  const sortBy = (attribute?: string) => {
    const sortedData = sortFilesAndFolders(data, attribute);
    setData([...sortedData]);
  };

  return (
    <div data-testid="app">
      {data.length > 0 && (
        <>
          <Sort sortBy={sortBy} />
          <Filter
            handleOnChange={({ target }: { target: HTMLInputElement }) =>
              setFilter(target.value)
            }
            filter={filter}
          />
          <ItemList items={data} filter={filter} />
        </>
      )}
    </div>
  );
}

export default App;
