import { Board } from '../../components/molecules/Board'
import s from './style.module.sass'
export const Main = () => {
  return (
    <div className={s.mainContainer}>
      <h1>Player 1</h1>
      <Board squareNumber={49} />
      <h1>Player 2</h1>
    </div>
  )
}
