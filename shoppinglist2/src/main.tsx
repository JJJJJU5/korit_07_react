import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);


const goolgeClientId = `${import.meta.env.VITE_GOOGLE_ID}`;

if(!goolgeClientId){
  console.warn("Google client ID가 설정되지 않았습니다.");
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={goolgeClientId}>
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
