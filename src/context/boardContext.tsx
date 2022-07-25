import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { IPosition, ISingleHeroStats } from '../types'

type Context = {
  // square selection
  squareSelected?: IPosition
  selectSquare: (position: IPosition) => void
  removeSelection: () => void
  cleanSquareSelection: () => void

  // hero selection
  heroSelected?: ISingleHeroStats
  selectHero: (hero?: ISingleHeroStats) => void
  removeHeroSelection: () => void

  // move
  moveOptions?: IPosition[]
  removeMoveOptions: () => void
  showMoveOptions: (hero: ISingleHeroStats) => void

  // atack
  attackOptions?: IPosition[]
  removeAttackOptions: () => void
  showAttackOptions: (hero: ISingleHeroStats) => void

  activeAction?: 'move' | 'attack'
}
const BoardContext = createContext<Context | undefined>(undefined)

type Props = {
  children?: ReactNode
}

export const BoardProvider: FC<Props> = ({ children }) => {
  const [squareSelected, setSquareSelected] = useState<number[] | undefined>(
    undefined,
  )
  const [moveOptions, setMoveOptions] = useState<IPosition[] | undefined>(
    undefined,
  )
  const [attackOptions, setAttackOptions] = useState<IPosition[] | undefined>(
    undefined,
  )
  const [heroSelected, setHeroSelected] = useState<
    ISingleHeroStats | undefined
  >(undefined)
  const [activeAction, setActiveAction] = useState<
    'move' | 'attack' | undefined
  >(undefined)
  const removeSelection = () => setSquareSelected([0, 0])
  const selectSquare = (position: IPosition) => {
    removeSelection()
    setSquareSelected(position)
  }
  const cleanSquareSelection = () => {
    setSquareSelected(undefined)
  }
  const removeMoveOptions = () => setMoveOptions(undefined)
  const removeAttackOptions = () => setAttackOptions(undefined)
  const showMoveOptions = (hero: ISingleHeroStats) => {
    removeMoveOptions()
    removeAttackOptions()
    setActiveAction('move')
    const moveRange = hero.hero.movement
    const newOptions = Array.from({ length: moveRange }).reduce(
      (acc: IPosition[], v, i) => {
        i += 1
        const up = [hero.position[0], hero.position[1] + i]
        const down = [hero.position[0], hero.position[1] - i]
        const left = [hero.position[0] - i, hero.position[1]]
        const right = [hero.position[0] + i, hero.position[1]]
        const topLeft = [hero.position[0] - i, hero.position[1] + i]
        const topRight = [hero.position[0] + i, hero.position[1] + i]
        const botLeft = [hero.position[0] - i, hero.position[1] - i]
        const botRight = [hero.position[0] + i, hero.position[1] - i]
        return [
          ...acc,
          up,
          down,
          left,
          right,
          topLeft,
          topRight,
          botLeft,
          botRight,
        ]
      },
      [] as IPosition[],
    )
    setMoveOptions(newOptions)
  }
  const showAttackOptions = (hero: ISingleHeroStats) => {
    removeAttackOptions()
    removeMoveOptions()
    setActiveAction('attack')
    const attackRange = 1
    const newOptions = Array.from({ length: attackRange }).reduce(
      (acc: IPosition[], v, i) => {
        i += 1
        const up = [hero.position[0], hero.position[1] + i]
        const down = [hero.position[0], hero.position[1] - i]
        const left = [hero.position[0] - i, hero.position[1]]
        const right = [hero.position[0] + i, hero.position[1]]
        const topLeft = [hero.position[0] - i, hero.position[1] + i]
        const topRight = [hero.position[0] + i, hero.position[1] + i]
        const botLeft = [hero.position[0] - i, hero.position[1] - i]
        const botRight = [hero.position[0] + i, hero.position[1] - i]
        return [
          ...acc,
          up,
          down,
          left,
          right,
          topLeft,
          topRight,
          botLeft,
          botRight,
        ]
      },
      [] as IPosition[],
    )
    setAttackOptions(newOptions)
  }
  const selectHero = (hero?: ISingleHeroStats) => {
    setHeroSelected(hero || undefined)
  }
  const removeHeroSelection = () => setHeroSelected(undefined)
  useEffect(() => {
    removeMoveOptions()
    removeAttackOptions()
  }, [heroSelected])

  return (
    <BoardContext.Provider
      value={{
        // square selection
        squareSelected,
        selectSquare,
        removeSelection,
        cleanSquareSelection,

        // movement
        moveOptions,
        showMoveOptions,
        removeMoveOptions,

        // atack
        attackOptions,
        showAttackOptions,
        removeAttackOptions,

        // hero selection
        heroSelected,
        selectHero,
        removeHeroSelection,

        activeAction,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
export const useBoard = () => {
  const context = useContext(BoardContext)
  if (context === undefined) {
    throw new Error('useBoard must be used within a provider')
  }
  return context
}
