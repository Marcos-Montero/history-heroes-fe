import { useBoard } from '../../../context/boardContext'
import s from './style.module.sass'
import React from 'react'
import classNames from 'classnames'
import { formatName } from '../../../utils'
import { IMatchStatus } from '../../../types'
const SingleHeroPanel = ({
  matchStatus,
  handleFieldChange,
  player,
  hero,
}: {
  matchStatus: IMatchStatus
  handleFieldChange: (e: React.ChangeEvent<HTMLSpanElement>) => void
  player: 1 | 2
  hero: 1 | 2 | 3
}) => {
  const heroSelected = matchStatus?.[`player${player}`]?.[`hero${hero}`]
  const isDead = heroSelected?.hero.health <= 0
  if (!matchStatus) {
    return null
  }
  return (
    <div className={classNames(s.heroContainer, isDead && s.dead)}>
      <p className={classNames(s.heroName, isDead && s.dead)}>
        {formatName(heroSelected.hero.name)}
      </p>
      {!isDead && (
        <div className={s.statsNumberContainer}>
          <span className={s.health} onChange={handleFieldChange}>
            {heroSelected?.hero.health}
          </span>
          <span className={s.resources} onChange={handleFieldChange}>
            {heroSelected?.hero.resources}
          </span>
          <span className={s.power} onChange={handleFieldChange}>
            {heroSelected?.hero.power}
          </span>
          <span className={s.defense} onChange={handleFieldChange}>
            {heroSelected?.hero.defense}
          </span>
        </div>
      )}
    </div>
  )
}
export const StatsPanel = () => {
  const { matchStatus } = useBoard()
  const handleFieldChange = (e: React.ChangeEvent<HTMLSpanElement>) => {
    const currentColor = e.target.style.color
    e.target.style.color = 'red'
    setTimeout(() => {
      e.target.style.color = currentColor
    }, 2000)
  }
  if (!matchStatus) {
    return null
  }
  return (
    <div className={s.statsContainer}>
      <div className={classNames(s.playerContainer, s.team1)}>
        <SingleHeroPanel
          matchStatus={matchStatus}
          handleFieldChange={handleFieldChange}
          player={1}
          hero={1}
        />
        <SingleHeroPanel
          matchStatus={matchStatus}
          handleFieldChange={handleFieldChange}
          player={1}
          hero={2}
        />
        <SingleHeroPanel
          matchStatus={matchStatus}
          handleFieldChange={handleFieldChange}
          player={1}
          hero={3}
        />
      </div>
      <div className={classNames(s.playerContainer, s.team2)}>
        <SingleHeroPanel
          matchStatus={matchStatus}
          handleFieldChange={handleFieldChange}
          player={2}
          hero={1}
        />
        <SingleHeroPanel
          matchStatus={matchStatus}
          handleFieldChange={handleFieldChange}
          player={2}
          hero={2}
        />
        <SingleHeroPanel
          matchStatus={matchStatus}
          handleFieldChange={handleFieldChange}
          player={2}
          hero={3}
        />
      </div>
    </div>
  )
}
