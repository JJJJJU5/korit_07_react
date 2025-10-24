import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import AppList from './AppList'
import Login from './Login'


function App() {

const queryClient = new QueryClient
    return (
      <>  
      <QueryClientProvider client={queryClient}>
      <Login />
      </QueryClientProvider>
      </>
    )
  }
export default App
