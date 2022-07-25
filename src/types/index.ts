export type HeroesNames =
  | 'nefertiti'
  | 'leonidas'
  | 'attila'
  | 'mariCurie'
  | 'daVinci'
  | 'sunTzu'
  | 'isabel'
  | 'bach'
  | 'cleopatra'
export type RolesNames = 'artist' | 'thinker' | 'warrior' | 'ruler'
export interface IHero {
  name: string
  role: RolesNames
  img: HeroesNames
  power: number
  health: number
  stamina: number
  movement: number
  defense: number
  attacks: (() => void)[]
}
export interface IHeroes {
  nefertiti: IHero
  leonidas: IHero
  attila: IHero
  mariCurie: IHero
  daVinci: IHero
  sunTzu: IHero
  bach: IHero
  isabel: IHero
  cleopatra: IHero
}
export type IPosition = number[]
export type ISingleHeroStats = {
  hero: IHero
  position: IPosition
  player: 1 | 2
  id: 1 | 2 | 3
}
export interface IHeroStatus {
  player1: {
    hero1: ISingleHeroStats
    hero2: ISingleHeroStats
    hero3: ISingleHeroStats
  }
  player2: {
    hero1: ISingleHeroStats
    hero2: ISingleHeroStats
    hero3: ISingleHeroStats
  }
}
