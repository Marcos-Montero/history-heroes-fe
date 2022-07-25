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
