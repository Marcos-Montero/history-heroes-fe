import classNames from 'classnames'
import { Svg } from '../../../svg'
import { IHero } from '../../../types'
import { StatusBar } from '../../atoms/StatusBar'
import s from './style.module.sass'
type IPickCard = {
  hero: IHero
  onClick?: () => void
  adding?: boolean
  removing?: boolean
  chosen?: boolean
}
export const PickCard = ({
  hero,
  onClick,
  adding,
  removing,
  chosen,
}: IPickCard) => {
  const { role, img, name, health, power, stamina, movement } = hero
  return (
    <div
      className={classNames(
        s.cardContainer,
        role === 'warrior' && s['-warrior'],
        role === 'artist' && s['-artist'],
        role === 'thinker' && s['-thinker'],
        role === 'ruler' && s['-ruler'],
        chosen && s['-chosen'],
      )}
      onClick={onClick}
    >
      {(adding || removing) && (
        <div className={s.actionIconFrame}>
          <Svg name={adding ? 'add' : 'remove'} width={80} height={80} />
        </div>
      )}
      {chosen && <div className={s.selectedFlag}></div>}
      <div className={s.imgFrame}>
        <Svg name={img} width={125} height={125} />
      </div>
      <h3 className={s.name}>{name}</h3>
      <div
        className={classNames(
          s.roleFrame,
          role === 'warrior' && s['-warrior'],
          role === 'artist' && s['-artist'],
          role === 'thinker' && s['-thinker'],
          role === 'ruler' && s['-ruler'],
        )}
      >
        <Svg name={role} />
      </div>
      <div className={s.statsFrame}>
        <div className={s.statusContainer}>
          <StatusBar label={'health'} value={health} generic />
          <StatusBar label={'power'} value={power} generic />
          <StatusBar label={'stamina'} value={stamina} generic />
          <StatusBar label={'movement'} value={movement} generic />
        </div>
      </div>
    </div>
  )
}
