import { useBoard } from '../../context/boardContext'
import s from './style.module.sass'
export const WinnerScreen = () => {
  const { winner, setWinner } = useBoard()
  if (!winner) {
    return null
  }
  return (
    <div className={s.winnerContainer}>
      <h1>Player {winner} won!</h1>
      <button onClick={() => setWinner(undefined)}>Play Again</button>
    </div>
  )
}
