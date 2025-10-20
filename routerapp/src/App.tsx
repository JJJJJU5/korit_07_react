import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Contact from './Contact'
import ContactSeoul from './ContactSeoul'
import ContactBusan from './ContactBusan'
import PageNotFound from './PageNotFound'

function App() {

  return (
    <>
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>{' | '}
        <Link to= "/contact">Contact</Link>
      </nav>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/contact' element={<Contact />}>
        <Route path='seoul' element={<ContactSeoul/>}/>
        <Route path='busan' element={<ContactBusan/>}/> 
      </Route>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
