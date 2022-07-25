import { useBoard } from '../../../context/boardContext'
import { Svg } from '../../../svg'
import s from './style.module.sass'
export const MoveAction = () => {
  const { heroSelected, showMoveOptions } = useBoard()
  const handleMove = () => {
    heroSelected && showMoveOptions(heroSelected)
  }
  return (
    <button className={s.moveAction_container} onClick={handleMove}>
      <Svg name="move" className={s.icon} fill={'white'} />
    </button>
  )
}
