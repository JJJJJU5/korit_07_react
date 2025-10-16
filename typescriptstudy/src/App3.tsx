import './App.css'
import HelloComponent from './HelloComponent'
import ByComponent from './ByComponent'
function App() {



  return (
    <>
    <HelloComponent name = "김일"  age={20} />
      <br />
      <br />
    <ByComponent name = "김일" />
    </>
  )
}

export default App
