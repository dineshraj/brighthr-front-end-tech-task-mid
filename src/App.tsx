import { useEffect, useState } from 'react';
import './App.css';
import fetchMock from './helpers/fetchMock';
import filesAndFolders from './api';
import sortFilesAndFolders from './helpers/sortFilesAndFolders';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (data: Object) => {
      const response = await fetchMock(data);
      const json = await response.json();
      const sortedArray = sortFilesAndFolders(json);
      setData(sortedArray);
    };

    fetchData(filesAndFolders);
  }, []);

  return (
    <div data-testid="app">
      {data && (
        <ul data-testid="file-list">
          {data.map((item: any, i: number) => (
            <li key={i}>
              <ul>
                <li className="name" data-testid="name">
                  {item.type !== 'folder' ? item.name : <button className="folder-button">{item.name}</button>}
                </li>
                <li data-testid="filetype">
                  <span>Filetype: </span>
                  {item.type}
                </li>
                {item.added && (
                  <li data-testid="date-added">
                    <span>Date Added: </span>
                    {item.added}
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
