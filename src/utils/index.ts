import { IPosition } from '../context/boardContext'

export const does = (
  bigArray: IPosition[],
): { contain: (smallArray: IPosition) => boolean } => {
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
