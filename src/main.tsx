import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BoardProvider } from './context/boardContext'
import { Amplify, API } from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator, Button } from '@aws-amplify/ui-react'
import { listHeroes } from './graphql/queries'
import { createHero } from './graphql/mutations'
// import { createTodo, deleteTodo } from './graphql/mutations'

Amplify.configure(config)

async function fetchNotes() {
  await API.graphql({
    query: createHero,
    variables: {
      name: 'nefertiti',
      role: 'ruler',
      power: 400,
      health: 900,
      resources: 200,
      defense: 200,
      movement: 3,
    },
  })
  await API.graphql({
    query: createHero,
    variables: {
      name: 'leonidas',
      role: 'warrior',
      power: 200,
      health: 1100,
      resources: 200,
      movement: 2,
      defense: 300,
    },
  })
  await API.graphql({
    query: createHero,
    variables: {
      name: 'marie_curie',
      role: 'artist',
      power: 250,
      health: 800,
      resources: 400,
      movement: 4,
      defense: 150,
    },
  })
  await API.graphql({
    query: createHero,
    variables: {
      name: 'da_vinci',
      role: 'artist',
      power: 150,
      health: 800,
      resources: 450,
      movement: 4,
      defense: 150,
    },
  })
  await API.graphql({
    query: createHero,
    variables: {
      name: 'attila',
      role: 'ruler',
      power: 300,
      health: 850,
      resources: 250,
      movement: 3,
      defense: 300,
    },
  })
  await API.graphql({
    query: createHero,
    variables: {
      name: 'sun_tzu',
      role: 'thinker',
      power: 300,
      health: 750,
      resources: 350,
      movement: 4,
      defense: 200,
    },
  })
  await API.graphql({
    query: createHero,
    variables: {
      name: 'isabel_i',
      role: 'ruler',
      power: 450,
      health: 800,
      resources: 200,
      movement: 4,
      defense: 150,
    },
  })
  await API.graphql({
    query: createHero,
    variables: {
      name: 'bach',
      role: 'artist',
      power: 150,
      health: 750,
      resources: 500,
      movement: 4,
      defense: 200,
    },
  })
  await API.graphql({
    query: createHero,
    variables: {
      name: 'cleopatra',
      role: 'ruler',
      power: 600,
      health: 600,
      resources: 300,
      movement: 3,
      defense: 200,
    },
  })
  const apiData = await API.graphql({ query: listHeroes })
  return apiData
}
const AppX = ({ signOut }: { signOut: any }) => {
  fetchNotes()
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
