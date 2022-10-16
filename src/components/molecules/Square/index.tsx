import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { HQ1, HQ2 } from '../../../constants/board'
import { useBoard } from '../../../context/boardContext'
import { Svg } from '../../../svg'
import { ISingleHeroStats } from '../../../types'
import { does, formatName, isOccupied, isWall } from '../../../utils'
import { StatusBar } from '../../atoms/StatusBar'
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
    updateHQ,
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
  const substractStamina = () => {
    if (!heroSelected) {
      return
    }
    return updateHero(heroSelected).stamina(-100)
  }
  const substractHQHealth = () => {
    if (!heroSelected) {
      return
    }
    if (!(isHQ1 || isHQ2)) {
      return
    }
    const hq = isHQ1 ? heroStatus?.hq1 : heroStatus?.hq2
    if (!hq) {
      return
    }
    const damageCalc = (attack: number) => {
      if (!heroSelected) {
        return
      }
      const randomDice = parseInt((Math.random() * 400).toFixed(0))
      const totalAttack = attack + randomDice
      log(
        `${formatName(heroSelected?.hero?.name)} [⚔️${
          totalAttack >= 0 ? totalAttack : 0
        }] HQ-${hq.player} (🔀 ${randomDice})`,
      )
      return totalAttack >= 0 ? totalAttack : 0
    }
    const totalDamage = damageCalc(heroSelected.hero.power)
    return hq && totalDamage && updateHQ(hq, -totalDamage)
  }

  const doNothing = () => {
    if (!heroSelected) {
      return
    }
    log(
      `${formatName(
        heroSelected.hero.name,
      )} doesn't have enough stamina to perform this action`,
    )
  }
  const handleAttackHQ = () => {
    if (heroSelected && heroSelected.hero.stamina >= 100) {
      substractStamina()
      substractHQHealth()
    } else if (heroSelected) {
      doNothing()
    }
  }
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
      {(isHQ1 || isHQ2) &&
        attackOptions &&
        does(attackOptions).contain(position) && (
          <div
            className={s.attackable}
            onClick={
              attackOptions && does(attackOptions).contain(position)
                ? handleAttackHQ
                : () => {}
            }
          >
            <Svg name="attack" width={'60%'} height={'60%'} fill="red" />
          </div>
        )}
      {isHQ1 && (
        <>
          <Svg name="hq1" width={50} height={50} />
          <div className={s.hqHealthBar}>
            <p className={s.hqHealth}>{heroStatus?.hq1.health}</p>
          </div>
        </>
      )}
      {isHQ2 && (
        <>
          <Svg name="hq2" width={50} height={50} />
          <div className={s.hqHealthBar}>
            <p className={s.hqHealth}>{heroStatus?.hq2.health}</p>
          </div>
        </>
      )}
    </div>
  )
}
