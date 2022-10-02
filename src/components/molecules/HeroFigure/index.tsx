import classNames from 'classnames'
import { useBoard } from '../../../context/boardContext'
import { Svg } from '../../../svg'
import { HeroesNames } from '../../../types'
import { HeroActions } from '../HeroActions'
import s from './style.module.sass'
export const HeroFigure = ({
  heroName,
  team,
  selected = false,
}: {
  heroName: HeroesNames
  team: 1 | 2
  selected: boolean
}) => {
  const { turn } = useBoard()
  return (
    <div className={s.heroFigure_container}>
      {team === turn && <HeroActions selected={selected} />}
      <div
        className={classNames(
          s.frameHero,
          team === 1 ? s.team1 : s.team2,
          selected && s.selected,
        )}
      >
        <Svg name={heroName} />
      </div>
    </div>
  )
}
