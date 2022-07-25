import { Board } from '../../components/molecules/Board'
import { PlayerCard } from '../../components/molecules/PlayerCard'
import s from './style.module.sass'
export const Main = () => {
  return (
    <div className={s.mainContainer}>
      <PlayerCard p={1} />
      <Board squareNumber={49} />
      <PlayerCard p={2} />
    </div>
  )
}
