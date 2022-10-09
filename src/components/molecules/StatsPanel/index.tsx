import { useBoard } from '../../../context/boardContext'
import s from './style.module.sass'
import React from 'react'
import classNames from 'classnames'
import { formatName } from '../../../utils'
export const StatsPanel = () => {
  const { heroStatus } = useBoard()
  const handleFieldChange = (e: React.ChangeEvent<HTMLSpanElement>) => {
    const currentColor = e.target.style.color
    e.target.style.color = 'red'
    setTimeout(() => {
      e.target.style.color = currentColor
    }, 2000)
  }
  const heroContainerClass = (health?: number) =>
    classNames(s.heroContainer, health && health <= 0 && s.dead)
  return (
    <div className={s.statsContainer}>
      <h4>Stats</h4>
      <div className={s.playerContainer}>
        <p
          className={heroContainerClass(heroStatus?.player1.hero1.hero.health)}
        >
          {heroStatus && formatName(heroStatus?.player1.hero1.hero.name)}
          <div className={s.statsNumberContainer}>
            <span className={s.health} onChange={handleFieldChange}>
              {heroStatus?.player1.hero1.hero.health}
            </span>
            <span className={s.stamina} onChange={handleFieldChange}>
              {heroStatus?.player1.hero1.hero.stamina}
            </span>
            <span className={s.power} onChange={handleFieldChange}>
              {heroStatus?.player1.hero1.hero.power}
            </span>
            <span className={s.defense} onChange={handleFieldChange}>
              {heroStatus?.player1.hero1.hero.defense}
            </span>
          </div>
        </p>
        <p
          className={heroContainerClass(heroStatus?.player1.hero2.hero.health)}
        >
          {heroStatus && formatName(heroStatus?.player1.hero2.hero.name)}
          <div className={s.statsNumberContainer}>
            <span className={s.health} onChange={handleFieldChange}>
              {heroStatus?.player1.hero2.hero.health}
            </span>
            <span className={s.stamina} onChange={handleFieldChange}>
              {heroStatus?.player1.hero2.hero.stamina}
            </span>
            <span className={s.power} onChange={handleFieldChange}>
              {heroStatus?.player1.hero2.hero.power}
            </span>
            <span className={s.defense} onChange={handleFieldChange}>
              {heroStatus?.player1.hero2.hero.defense}
            </span>
          </div>
        </p>
        <p
          className={heroContainerClass(heroStatus?.player1.hero3.hero.health)}
        >
          {heroStatus && formatName(heroStatus?.player1.hero3.hero.name)}
          <div className={s.statsNumberContainer}>
            <span className={s.health} onChange={handleFieldChange}>
              {heroStatus?.player1.hero3.hero.health}
            </span>
            <span className={s.stamina}>
              {heroStatus?.player1.hero3.hero.stamina}
            </span>
            <span className={s.power} onChange={handleFieldChange}>
              {heroStatus?.player1.hero3.hero.power}
            </span>
            <span className={s.defense} onChange={handleFieldChange}>
              {heroStatus?.player1.hero3.hero.defense}
            </span>
          </div>
        </p>
      </div>
      <div className={s.playerContainer}>
        <p
          className={heroContainerClass(heroStatus?.player2.hero1.hero.health)}
        >
          {heroStatus && formatName(heroStatus?.player2.hero1.hero.name)}
          <div className={s.statsNumberContainer}>
            <span className={s.health}>
              {heroStatus?.player2.hero1.hero.health}
            </span>
            <span className={s.stamina}>
              {heroStatus?.player2.hero1.hero.stamina}
            </span>
            <span className={s.power}>
              {heroStatus?.player2.hero1.hero.power}
            </span>
            <span className={s.defense}>
              {heroStatus?.player2.hero1.hero.defense}
            </span>
          </div>
        </p>
        <p
          className={heroContainerClass(heroStatus?.player2.hero2.hero.health)}
        >
          {heroStatus && formatName(heroStatus?.player2.hero2.hero.name)}
          <div className={s.statsNumberContainer}>
            <span className={s.health}>
              {heroStatus?.player2.hero2.hero.health}
            </span>
            <span className={s.stamina}>
              {heroStatus?.player2.hero2.hero.stamina}
            </span>
            <span className={s.power}>
              {heroStatus?.player2.hero2.hero.power}
            </span>
            <span className={s.defense}>
              {heroStatus?.player2.hero2.hero.defense}
            </span>
          </div>
        </p>
        <p
          className={heroContainerClass(heroStatus?.player2.hero3.hero.health)}
        >
          {heroStatus && formatName(heroStatus?.player2.hero3.hero.name)}
          <div className={s.statsNumberContainer}>
            <span className={s.health}>
              {heroStatus?.player2.hero3.hero.health}
            </span>
            <span className={s.stamina}>
              {heroStatus?.player2.hero3.hero.stamina}
            </span>
            <span className={s.power}>
              {heroStatus?.player2.hero3.hero.power}
            </span>
            <span className={s.defense}>
              {heroStatus?.player2.hero3.hero.defense}
            </span>
          </div>
        </p>
      </div>
    </div>
  )
}
