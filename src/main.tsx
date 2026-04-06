import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Remove loading screen if any
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.electronAPI.onUpdate((message: string) => {
  console.log(message)
})
