import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useBoard } from '../../../context/boardContext'
import { Svg } from '../../../svg'
import { ISingleHeroStats } from '../../../types'
import { does, formatName, isOccupied, isWall } from '../../../utils'
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
    updateHero,
    heroStatus,
    log,
  } = useBoard()
  const isHQ1 = position[0] === 7 && position[1] === 1
  const isHQ2 = position[0] === 1 && position[1] === 7

  const isWall1 = isWall(position).wall === 1
  const isWall2 = isWall(position).wall === 2

  const handleSquareClick = () => {
    if (moveOptions && does(moveOptions).contain(position) && heroSelected) {
      log(
        `[ ${formatName(heroSelected.hero.name)} ] ${
          heroSelected.position
        } ⏩ ${position}`,
      )
      updateHero(heroSelected).position(position)
    }
    /*   selectSquare(position)
    if (!occupant) selectHero(undefined)
    if (occupant) {
      selectHero(occupant)
    } */
  }
  const getHeroWithMostStamina = () => {
    if (!heroStatus) {
      return
    }
    const heroes = [
      ...Object.entries(heroStatus.player1).map(([, hero]) => hero),
      ...Object.entries(heroStatus.player2).map(([, hero]) => hero),
    ]
    const orderByStamina = (a: ISingleHeroStats, b: ISingleHeroStats) =>
      a?.hero?.stamina - b?.hero?.stamina
    const heroWithMostStamina = heroes.sort(orderByStamina)[0]
    return heroWithMostStamina
  }
  useEffect(() => {
    setOccupant(undefined)
    const { occupant } = isOccupied(position, heroStatus)
    if (occupant && getHeroWithMostStamina() === occupant) {
      selectSquare(position)
      selectHero(occupant)
    }
    if (occupant && occupant?.hero.health > 0) {
      setOccupant(occupant)
    } else if (occupant) {
      log(`💀 ${formatName(occupant.hero.name)} died !`)
    }
  }, [heroStatus])
  const squareStyle = classNames(
    s.square,
    squareSelected === position && s.selected,

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
      {isWall(position).value && (
        <div
          style={{
            transform: `rotate(${isWall1 ? '-90deg' : '90deg'})`,
          }}
        >
          <Svg name="basicArrow" width={30} height={30} />
        </div>
      )}
      {occupant && occupant.hero.health > 0 && (
        <HeroFigure
          attackable={
            attackOptions
              ? does(attackOptions).contain(position) &&
                heroSelected?.player !== occupant.player
              : false
          }
          hero={occupant}
          selected={heroSelected === occupant}
        />
      )}
      {isHQ1 && <Svg name="hq1" width={50} height={50} />}
      {isHQ2 && <Svg name="hq2" width={50} height={50} />}
    </div>
  )
}
