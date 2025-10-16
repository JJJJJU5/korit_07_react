import './App2.css'
import AuthContext from './AuthContext'
import MyComponent from './MyComponent';
import MyTable from './MyTable';
import MyComponent2 from './MyComponent2';
import MyForm from './MyForm.jsx';
function App2() {
  const username ='막스 베르스타펜';

  return (
    
    <AuthContext.Provider value={username} >
      <MyComponent />
      <MyTable/>    
      <MyComponent2 />
      <MyForm/>
    </AuthContext.Provider>
    
  )
}

export default App2
