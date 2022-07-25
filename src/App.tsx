import { useMatch } from './context/matchContext'
import { Game } from './layout/Game'
import { Start } from './layout/Start'
import './styles/_main.sass'
const App = () => {
  const { inGame } = useMatch()
  return <>{inGame ? <Game /> : <Start />}</>
}

export default App
