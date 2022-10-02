export type HeroesNames =
  | 'nefertiti'
  | 'leonidas'
  | 'attila'
  | 'marie_curie'
  | 'da_vinci'
  | 'sun_tzu'
  | 'isabel_i'
  | 'bach'
  | 'cleopatra'
export type RolesNames = 'artist' | 'thinker' | 'warrior' | 'ruler'
export interface IHero {
  name: HeroesNames
  role: RolesNames
  power: number
  health: number
  stamina: number
  movement: number
  defense: number
}
export type IHeroes = IHero[]
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
export interface IOptions {
  positions: IPosition[]
  blocks: {
    up: boolean
    right: boolean
    bottom: boolean
    left: boolean
  }
}
