import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);


/*
  Approach............

  Initialise vite
  Use React / ReactRouter / Typescript / Jest / React testing utils
  So in App.tsx ..
    import the json from ./api
    map over the response
      if type = file
        output the file name 
      if type = folder 
        map again over the entries
    
    
    If it's a folder link to its name using React Router
    that'll have a "to" property of ?folder=${folderName}


    use a useEffect which will listen to the folder param (via URLSearchParams) (so need to set it in state for a selected folder)
    if that changes, then setState for selected folder?

    When rendering, if there is a selectedFolder then just render that? 



    Nice to have: recursive for handling folders in folders but unsure how that'll work with the setState method above (I guess a deeper search)
*/