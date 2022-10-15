import classNames from 'classnames'
import { AttackAction } from '../../atoms/AttackAction'
import { MoveAction } from '../../atoms/MoveAction'
import { RestAction } from '../../atoms/RestAction'
import s from './style.module.sass'
export const HeroActions = ({ selected }: { selected: boolean }) => {
  return (
    <div
      className={classNames(s.heroActions_Container, selected && s.selected)}
    >
      <MoveAction />
      <AttackAction />
      <RestAction />
    </div>
  )
}
