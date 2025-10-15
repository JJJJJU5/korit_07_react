import { useRef } from 'react'
import './App.css'
function App() {
  const inputRef = useRef(null);
  const hadlerClick = () => {
    if(inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }
  return (
  <>
    <input ref={inputRef}/>
    <br/>
    <br/>
    <button onClick={hadlerClick}>강제 포커스 활성화</button>
  </>
  )
}
export default App
