import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BoardProvider } from './context/boardContext'
import { Amplify, Auth } from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator, Button } from '@aws-amplify/ui-react'
import { AdminPanel } from './layout/AdminPanel'

Amplify.configure(config)

const AppX = ({ signOut }: { signOut: any }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPanel, setAdminPanel] = useState(false)
  Auth.currentUserInfo().then((user) => {
    if (
      user.attributes.email === 'marcos.mon.rod@gmail.com' ||
      user.attributes.email === 'victorpizarrosanchez@gmail.com'
    ) {
      setIsAdmin(true)
    }
  })
  const toggleAdminPanel = () => {
    setAdminPanel(!adminPanel)
  }
  return (
    <div>
      <BoardProvider>
        {isAdmin && (
          <>
            <button
              style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
              }}
              onClick={toggleAdminPanel}
            >
              Only For Admins
            </button>
            {adminPanel && <AdminPanel />}{' '}
          </>
        )}
        {!adminPanel && <App />}
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
