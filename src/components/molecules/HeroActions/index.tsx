import classNames from 'classnames'
import { useBoard } from '../../../context/boardContext'
import { AttackAction } from '../../atoms/AttackAction'
import { MoveAction } from '../../atoms/MoveAction'
import s from './style.module.sass'
export const HeroActions = ({ selected }: { selected: boolean }) => {
  const { heroSelected } = useBoard()
  return (
    <div
      className={classNames(
        s.heroActions_Container,
        selected && s.selected,
        heroSelected?.position[1] === 1 && s.invert,
      )}
    >
      <MoveAction />
      <AttackAction />
    </div>
  )
}
