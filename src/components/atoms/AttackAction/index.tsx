import { useBoard } from '../../../context/boardContext'
import { Svg } from '../../../svg'
import s from './style.module.sass'
export const AttackAction = () => {
  const { showAttackOptions, heroSelected } = useBoard()
  const handleAttack = () => {
    heroSelected && showAttackOptions(heroSelected)
  }
  return (
    <div className={s.attackAction_container} onClick={handleAttack}>
      <Svg name="attack" className={s.icon} />
    </div>
  )
}
