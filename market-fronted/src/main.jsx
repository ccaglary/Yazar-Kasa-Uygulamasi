import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// BrowserRouter yerine HashRouter import ediyoruz
import { HashRouter } from 'react-router-dom'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter yerine HashRouter kullanıyoruz */}
    <HashRouter> 
      <App />
    </HashRouter> 
  </React.StrictMode>,
)