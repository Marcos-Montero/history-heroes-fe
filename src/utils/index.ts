import { IPosition } from '../types'

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
export const selectRandomly = (arr: any[]) =>
  parseInt((Math.random() * (arr.length - 1)).toFixed(0))

export const buildTriplet = (arr: any[], triplet: number[] = []) => {
  const randomSelection: number = selectRandomly(arr)
  if (!triplet.includes(randomSelection)) {
    triplet.push(randomSelection)
  }
  if (!triplet.includes(randomSelection)) {
    if (triplet.length < 3) {
      buildTriplet(triplet, arr)
    }
  }
  return triplet
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
