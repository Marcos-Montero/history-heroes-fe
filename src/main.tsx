import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BoardProvider } from './context/boardContext'
import { MatchProvider } from './context/matchContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MatchProvider>
      <BoardProvider>
        <App />
      </BoardProvider>
    </MatchProvider>
  </React.StrictMode>,
)
