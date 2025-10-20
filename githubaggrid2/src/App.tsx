import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { ColDef, ICellEditorParams } from 'ag-grid-community';

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
  username : string
  owner : {
    login : string
  }
}
function App() {
  const [keyword, setKeyword] = useState("");
  const [repodata, setRepodata] = useState<Repository[]>([]);
  const [columnDefs] = useState<ColDef[]>([
    {field : 'owner.login',sortable:true, filter: true ,suppressMovable: false},// 컬럼 1
  // {field : 'id' , sortable: true, filter: true},  // 컬럼1
    {field : 'full_name',sortable: true, filter: true,suppressMovable: true},  // 컬럼2
    {field : 'html_url',sortable:true, filter: true ,suppressMovable: true}, // 컬럼 3
    {                                                 // 컬럼 4
      headerName: 'Action',
      field: 'full_name',
      suppressMovable: true,
      cellRenderer: (params : ICellEditorParams) => (
        <button
        onClick={() => alert(params.value)}>
            Press Me ❗
        </button>
      )}
])

  const handleClick = () => {
    axios.get<{ items: Repository[] }>(`https://api.github.com/search/repositories?q=${keyword}`)
      .then(response => setRepodata(response.data.items))
      .catch(error => console.log(error))
  }

  return (
    <>
    <div>
      <input type="text" onChange={e => setKeyword(e.target.value)} value={keyword} />
      <button onClick={handleClick}> 검색 </button>
      <div className='ag-theme-material'
        style={{height: 500, width: 850}}>
          <AgGridReact rowData={repodata}
          columnDefs={columnDefs}
          paginationPageSize={5}/>
      </div>  
    </div>
    </>
  )
}
export default App
