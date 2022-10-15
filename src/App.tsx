import { useBoard } from './context/boardContext'
import { Game } from './layout/Game'
import { Start } from './layout/Start'
import { WinnerScreen } from './layout/WinnerScreen'
import './styles/_main.sass'
const App = () => {
  const { inGame, winner } = useBoard()
  const OutGame = winner ? <WinnerScreen /> : <Start />
  const AppRender = <>{inGame ? <Game /> : OutGame}</>
  return AppRender
}

export default App
