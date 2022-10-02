import { useBoard } from './context/boardContext'
import { Game } from './layout/Game'
import { Start } from './layout/Start'
import './styles/_main.sass'
const App = () => {
  const { inGame } = useBoard()
  return <>{inGame ? <Game /> : <Start />}</>
}

export default App
