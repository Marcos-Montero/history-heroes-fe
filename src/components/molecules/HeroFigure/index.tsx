import classNames from 'classnames'
import { useBoard } from '../../../context/boardContext'
import { Svg } from '../../../svg'
import { ISingleHeroStats } from '../../../types'
import { formatName } from '../../../utils'
import { HeroActions } from '../HeroActions'
import s from './style.module.sass'
export const HeroFigure = ({
  hero,
  selected = false,
  attackable = false,
}: {
  hero: ISingleHeroStats
  selected: boolean
  attackable: boolean
}) => {
  const { log, heroSelected, updateHero } = useBoard()

  const substractResources = () => {
    if (!heroSelected) {
      return
    }
    return updateHero(heroSelected).resources(-100)
  }
  const substractHealth = () => {
    if (!heroSelected) {
      return
    }
    const damageCalc = (attack: number, defense: number) => {
      const randomDice = parseInt((Math.random() * 400).toFixed(0))
      const totalAttack = attack + randomDice - defense
      log(
        `${formatName(heroSelected.hero.name)} [⚔️${
          totalAttack >= 0 ? totalAttack : 0
        }] ${formatName(hero.hero.name)} (🔀 ${randomDice})`,
      )
      return totalAttack >= 0 ? totalAttack : 0
    }
    const totalDamage = damageCalc(heroSelected.hero.power, hero.hero.defense)
    return updateHero(hero).health(-totalDamage)
  }

  const doNothing = () => {
    if (!heroSelected) {
      return
    }
    log(
      `${formatName(
        heroSelected.hero.name,
      )} doesn't have enough resources to perform this action`,
    )
  }
  const handleAttack = () => {
    if (heroSelected && heroSelected.hero.resources >= 100) {
      substractResources()
      substractHealth()
    } else if (heroSelected) {
      doNothing()
    }
  }
  return (
    <button
      className={s.heroFigure_container}
      onClick={attackable ? handleAttack : () => {}}
    >
      <HeroActions selected={selected} />
      <div
        className={classNames(
          s.frameHero,
          hero.player === 1 ? s.team1 : s.team2,
          selected && s.selected,
        )}
      >
        {attackable && (
          <div className={s.attackable}>
            <Svg name="attack" width={'60%'} height={'60%'} fill="red" />
          </div>
        )}
        <Svg name={hero.hero.name} />
      </div>
    </button>
  )
}
