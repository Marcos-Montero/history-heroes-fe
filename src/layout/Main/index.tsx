import { Board } from '../../components/molecules/Board'
import s from './style.module.sass'
export const Main = () => {
  return (
    <div className={s.mainContainer}>
      <Board squareNumber={49} />
    </div>
  )
}
