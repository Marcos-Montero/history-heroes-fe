import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useBoard } from '../../../context/boardContext'
import { IHeroStatus, ISingleHeroStats } from '../../../types'
import { does } from '../../../utils'
import { HeroFigure } from '../HeroFigure'
import s from './style.module.sass'
type Props = {
  position: [number, number]
}
export const Square = ({ position }: Props) => {
  const [occupant, setOccupant] = useState<ISingleHeroStats>()
  const {
    moveOptions,
    squareSelected,
    selectSquare,
    heroSelected,
    selectHero,
    attackOptions,
  } = useBoard()
  const { move, heroStatus } = useBoard()
  const isHQ1 = position[0] === 7 && position[1] === 1
  const isHQ2 = position[0] === 1 && position[1] === 7
  const checkIfPos = (arr: number[]) => {
    return {
      equals: (x: number, y: number) => arr[0] === x && arr[1] === y,
    }
  }
  const isWall1 =
    checkIfPos(position).equals(1, 4) ||
    checkIfPos(position).equals(2, 4) ||
    checkIfPos(position).equals(3, 4)
  const isWall2 =
    checkIfPos(position).equals(5, 4) ||
    checkIfPos(position).equals(6, 4) ||
    checkIfPos(position).equals(7, 4)

  const handleSquareClick = () => {
    if (moveOptions && does(moveOptions).contain(position) && heroSelected) {
      console.log(`moving ${heroSelected.hero.name} to ${position}`)
      move(heroSelected).to(position)
    }
    selectSquare(position)
    if (!occupant) selectHero(undefined)
    if (occupant) {
      selectHero(occupant)
    }
    console.log(
      `%c{{ ⚔ POSITION [ ${position} ] SELECTED ${
        occupant ? occupant?.hero.name + ' is on it' : ''
      }⚔ }}`,
      'color: orange; background: #2e2e2e; font-weight: bold',
    )
  }
  useEffect(() => {
    setOccupant(undefined)
    if (heroStatus) {
      Object.entries(heroStatus).forEach(
        ([key, playerHeroes]: [string, IHeroStatus]) => {
          Object.entries(playerHeroes).forEach(
            ([k, hero]: [string, ISingleHeroStats]): void => {
              if (checkIfPos(hero.position).equals(position[0], position[1])) {
                setOccupant(hero)
                console.log(position + ': ' + occupant?.hero.name)
              }
            },
          )
        },
      )
    }
  }, [heroStatus])
  const squareStyle = classNames(
    s.square,
    squareSelected === position && s.selected,
    isHQ1 && s.hq1,
    isHQ2 && s.hq2,
    isWall1 && s.wall1,
    isWall2 && s.wall2,
    moveOptions &&
      position &&
      does(moveOptions).contain(position) &&
      s.moveOption,
    attackOptions &&
      position &&
      does(attackOptions).contain(position) &&
      s.attackOption,
  )
  return (
    <div className={squareStyle} onClick={handleSquareClick}>
      {occupant && (
        <HeroFigure
          heroName={occupant.hero.name}
          team={occupant.player}
          selected={heroSelected === occupant}
          onClick={handleSquareClick}
        />
      )}
      {isHQ1 && <h3>HQ1</h3>}
      {isHQ2 && <h3>HQ2</h3>}
    </div>
  )
}
