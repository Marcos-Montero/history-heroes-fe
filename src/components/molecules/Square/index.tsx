import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useBoard } from '../../../context/boardContext'
import { Svg } from '../../../svg'
import { ISingleHeroStats } from '../../../types'
import { does, isOccupied, isWall } from '../../../utils'
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
    turn,
  } = useBoard()
  const { move, heroStatus } = useBoard()
  const isHQ1 = position[0] === 7 && position[1] === 1
  const isHQ2 = position[0] === 1 && position[1] === 7

  const isWall1 = isWall(position).wall === 1
  const isWall2 = isWall(position).wall === 2

  const handleSquareClick = () => {
    if (
      turn === heroSelected?.player &&
      moveOptions &&
      does(moveOptions).contain(position) &&
      heroSelected
    ) {
      move(heroSelected).to(position)
    }
    selectSquare(position)
    if (!occupant) selectHero(undefined)
    if (occupant) {
      selectHero(occupant)
    }
  }
  useEffect(() => {
    setOccupant(undefined)
    const { occupant } = isOccupied(position, heroStatus)
    setOccupant(occupant)
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
      {isWall(position).value && (
        <div
          style={{
            transform: `rotate(${isWall1 ? '-90deg' : '90deg'})`,
          }}
        >
          <Svg name="basicArrow" width={30} height={30} />
        </div>
      )}
      {occupant && (
        <HeroFigure
          heroName={occupant.hero.name}
          team={occupant.player}
          selected={heroSelected === occupant}
        />
      )}
      {isHQ1 && <h3>HQ1</h3>}
      {isHQ2 && <h3>HQ2</h3>}
    </div>
  )
}
