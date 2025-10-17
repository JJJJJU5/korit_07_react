import { useState } from 'react'
import './App.css'

function App() {

  const [ name , setName ] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);

  }

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault
    alert(`Hello ${name}`)
  }

  return (
    <>
    <form onSubmit={handelSubmit}>
      <input type="text" onChange={handleChange} />
      <input type="submit" />
    </form>


    </>
  )
}

export default App
