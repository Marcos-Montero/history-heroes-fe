import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BoardProvider } from './context/boardContext'
import { Amplify } from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator, Button } from '@aws-amplify/ui-react'
import { getHeroes } from './api/getHeroes'

Amplify.configure(config)

const AppX = ({ signOut }: { signOut: any }) => {
  const handleClick = async () => {
    const heroes = await getHeroes()
    console.log(heroes)
  }
  return (
    <div>
      <BoardProvider>
        <App />
      </BoardProvider>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  )
}
const AppWithAuth = withAuthenticator(AppX)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithAuth signOut />
  </React.StrictMode>,
)
