import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Repositories from './Repositories'
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const queryClient = new QueryClient()

function App() {

  


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Repositories searchkeyword={searchkeyword} />
        <input type="text" value={searchkeyword}></input>
        <button onClick={onclickbutton}>검색</button>
      </QueryClientProvider>
    </>
  )
}

export default App
