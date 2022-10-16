import { HQ1, HQ2, wall1, wall2 } from '../constants/board'
import {
  IHero,
  IMatchStatus,
  IHQ,
  IOccupant,
  IPosition,
  ISingleHeroStats,
} from '../types'

export const does = (
  bigArray: any,
): { contain: (smallArray: any) => boolean } => {
  const methods = {
    contain: (smallArray: IPosition): boolean => {
      const bigParsed = JSON.stringify(bigArray)
      const smallParsed = JSON.stringify(smallArray)
      const check = bigParsed.indexOf(smallParsed)
      return check !== -1
    },
  }
  return methods
}
export const selectRandomly = (length: number) =>
  parseInt((Math.random() * (length - 1)).toFixed(0))

export const buildTriplet = (heroes: IHero[]) => {
  const newHeroIndex1 = selectRandomly(heroes.length)
  const newHeroIndex2 = selectRandomly(heroes.length - 1)
  const newHeroIndex3 = selectRandomly(heroes.length - 2)

  const newHero1 = heroes[newHeroIndex1]
  let rest = heroes.filter((value, i) => i !== newHeroIndex1)
  const newHero2 = rest[newHeroIndex2]
  rest = rest.filter((v, i) => i !== newHeroIndex2)
  const newHero3 = rest[newHeroIndex3]
  rest = rest.filter((v, i) => i !== newHeroIndex3)
  return { triplet: [newHero1, newHero2, newHero3], rest }
}
export const formatName = (rawName: string) => {
  const separatedWords = rawName.split('_')
  const firstCapitalizedWords = separatedWords.map((v) => {
    const firstLetter = v[0].toUpperCase()
    const rest = v.slice(1)
    return firstLetter + rest
  })
  return firstCapitalizedWords.join(' ')
}
export const checkIfPos = (arr: number[]) => {
  return {
    equals: (pos: number[]) => arr[0] === pos[0] && arr[1] === pos[1],
  }
}
export const isWall = (arr: number[]) => {
  const isWall1 =
    checkIfPos(arr).equals(wall1[0]) ||
    checkIfPos(arr).equals(wall1[1]) ||
    checkIfPos(arr).equals(wall1[2])
  const isWall2 =
    checkIfPos(arr).equals(wall2[0]) ||
    checkIfPos(arr).equals(wall2[1]) ||
    checkIfPos(arr).equals(wall2[2])
  const result = {
    value: isWall1 || isWall2,
    wall: isWall1 ? 1 : isWall2 && 2,
  }
  return result
}
export const isOccupied = (
  position: IPosition,
  matchStatus: IMatchStatus | undefined,
): IOccupant => {
  let result: IOccupant = { value: false }
  if (matchStatus) {
    Object.entries(matchStatus).forEach(
      ([key, playerHeroes]: [string, IMatchStatus]) => {
        Object.entries(playerHeroes).forEach(
          ([k, hero]: [string, ISingleHeroStats]): void => {
            if (hero.position && position) {
              if (
                checkIfPos(hero.position).equals([position[0], position[1]])
              ) {
                result = {
                  value: true,
                  occupant: hero,
                }
              }
            }
          },
        )
      },
    )
  }
  return result
}

export const isHQ = (position: IPosition): IHQ => {
  if (!position) {
    return { value: false, hq: undefined }
  }
  const isHQ1 = position === HQ1 ? 1 : undefined
  const isHQ2 = position === HQ2 ? 2 : undefined
  return {
    value: checkIfPos(position).equals(HQ1) || checkIfPos(position).equals(HQ2),
    hq: isHQ1 || isHQ2,
  }
}
