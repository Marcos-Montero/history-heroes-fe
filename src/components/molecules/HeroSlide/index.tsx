import classNames from 'classnames'
import { Svg } from '../../../svg'
import { IHero } from '../../../types'
import { StatusBar } from '../../atoms/StatusBar'
import s from './style.module.sass'

export const HeroSlide = ({
  hero,
  right,
}: {
  hero: IHero
  right?: boolean
}) => {
  return (
    <div className={classNames(s.slideContainer, right && s['-right'])}>
      <div className={s.imgFrame}>
        <Svg name={hero.name} height={60} width={60} />
      </div>
      <h3 className={s.heroName}>{hero.name}</h3>
      <div className={classNames(s.statusContainer, right && s['-right'])}>
        <StatusBar label="health" value={hero.health} />
        <StatusBar label="stamina" value={hero.stamina} />
      </div>
    </div>
  )
}
