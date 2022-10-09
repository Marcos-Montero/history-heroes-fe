import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

import {
  IHero,
  IHeroStatus,
  IOptions,
  IPosition,
  ISingleHeroStats,
} from '../types'
import produce from 'immer'
import { isHQ, isOccupied, isWall } from '../utils'

type Props = {
  children?: ReactNode
}
export enum Stats {
  // eslint-disable-next-line no-unused-vars
  POWER = 'power',
  // eslint-disable-next-line no-unused-vars
  STAMINA = 'stamina',
  // eslint-disable-next-line no-unused-vars
  MOVEMENT = 'movement',
  // eslint-disable-next-line no-unused-vars
  DEFENSE = 'defense',
  // eslint-disable-next-line no-unused-vars
  HEALTH = 'health',
}
export interface UpdateMethods {
  power: (q: number) => ISingleHeroStats
  stamina: (q: number) => ISingleHeroStats
  health: (q: number) => ISingleHeroStats
  movement: (q: number) => ISingleHeroStats
  defense: (q: number) => ISingleHeroStats
  position: (pos: number[]) => ISingleHeroStats
}

type Context = {
  inGame: boolean
  setInGame: Dispatch<SetStateAction<boolean>>
  player1heroes: IHero[]
  player2heroes: IHero[]
  addHero: (hero: IHero, playerNumber: number) => void
  removeHero: (hero: IHero, playerNumber: number) => void
  setPlayer1heroes: Dispatch<SetStateAction<IHero[]>>
  setPlayer2heroes: Dispatch<SetStateAction<IHero[]>>
  startGame: () => void
  heroStatus: IHeroStatus | undefined
  setHeroStatus: Dispatch<SetStateAction<IHeroStatus | undefined>>
  updateStatusOfHero: (
    updatedHero: ISingleHeroStats,
    heroStatus: IHeroStatus,
  ) => void
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
  updateHero: (hero: ISingleHeroStats) => UpdateMethods
  historical: string[] | undefined
  log: (log: string) => void
}
const BoardContext = createContext<Context | undefined>(undefined)

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
  const [inGame, setInGame] = useState(false)
  const [player1heroes, setPlayer1heroes] = useState<IHero[]>([])
  const [player2heroes, setPlayer2heroes] = useState<IHero[]>([])
  const [heroStatus, setHeroStatus] = useState<IHeroStatus | undefined>(
    undefined,
  )
  const [historical, setHistorical] = useState<string[]>()

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
  const resetOptions = () => {
    removeMoveOptions()
    removeAttackOptions()
  }

  // MOVEMENT

  const showMoveOptions = (hero: ISingleHeroStats) => {
    resetOptions()
    setActiveAction('move')
    const moveRange = hero.hero.movement

    const moveRangeArray = Array.from({ length: moveRange })
    const newPositions = moveRangeArray.reduce(
      (acc: IOptions, v, i) => {
        const [x, y] = hero.position
        const up: IPosition = [x, y + i]
        const bottom: IPosition = [x, y - i]
        const left: IPosition = [x - i, y]
        const right: IPosition = [x + i, y]

        const result = produce(acc, (draft: IOptions) => {
          // CHECK IF OCCUPANT OR HQ
          let skipUp = false
          let skipRight = false
          let skipBottom = false
          let skipLeft = false
          if (isOccupied(up, heroStatus).value || isHQ(up).value) {
            skipUp = true
          }
          if (isOccupied(right, heroStatus).value || isHQ(right).value) {
            skipRight = true
          }
          if (isOccupied(bottom, heroStatus).value || isHQ(bottom).value) {
            skipBottom = true
          }
          if (isOccupied(left, heroStatus).value || isHQ(left).value) {
            skipLeft = true
          }
          // CHECK IF WALL
          if (isWall(up).value && isWall(up).wall === hero.player) {
            draft.blocks.up = true
          }
          if (isWall(right).value && isWall(right).wall === hero.player) {
            draft.blocks.right = true
          }
          if (isWall(bottom).value && isWall(bottom).wall === hero.player) {
            draft.blocks.bottom = true
          }
          if (isWall(left).value && isWall(left).wall === hero.player) {
            draft.blocks.left = true
          }
          !skipUp && !draft.blocks.up && draft.positions.push(up)
          !skipRight && !draft.blocks.right && draft.positions.push(right)
          !skipBottom && !draft.blocks.bottom && draft.positions.push(bottom)
          !skipLeft && !draft.blocks.left && draft.positions.push(left)
        })
        return result
      },
      {
        positions: [],
        blocks: {
          up: false,
          right: false,
          bottom: false,
          left: false,
        },
      } as IOptions,
    )
    setMoveOptions(newPositions.positions)
  }

  // ATTACK

  const showAttackOptions = (hero: ISingleHeroStats) => {
    resetOptions()
    setActiveAction('attack')
    const attackRange = 1
    const newOptions = Array.from({ length: attackRange }).reduce(
      (acc: IPosition[], v, i) => {
        i += 1
        const [x, y] = hero.position

        const up = [x, y + i]
        const down = [x, y - i]
        const left = [x - i, y]
        const right = [x + i, y]
        const topLeft = [x - i, y + i]
        const topRight = [x + i, y + i]
        const botLeft = [x - i, y - i]
        const botRight = [x + i, y - i]
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
  const addHero = (hero: IHero, playerNumber: number) => {
    if (playerNumber === 1) setPlayer1heroes([...player1heroes, hero])
    if (playerNumber === 2) setPlayer2heroes([...player2heroes, hero])
  }
  const removeHero = (hero: IHero, playerNumber: number) => {
    if (playerNumber === 1) {
      setPlayer1heroes(player1heroes.filter((v) => v.name !== hero.name))
    }
    if (playerNumber === 2) {
      setPlayer2heroes(player2heroes.filter((v) => v.name !== hero.name))
    }
  }
  const startGame = () => {
    setInGame(true)
    setHeroStatus({
      player1: {
        hero1: {
          hero: player1heroes[0],
          position: [1, 2],
          player: 1,
          id: 1,
        },
        hero2: {
          hero: player1heroes[1],
          position: [2, 2],
          player: 1,
          id: 2,
        },
        hero3: {
          hero: player1heroes[2],
          position: [2, 1],
          player: 1,
          id: 3,
        },
      },
      player2: {
        hero1: {
          hero: player2heroes[0],
          position: [7, 6],
          player: 2,
          id: 1,
        },
        hero2: {
          hero: player2heroes[1],
          position: [6, 6],
          player: 2,
          id: 2,
        },
        hero3: {
          hero: player2heroes[2],
          position: [6, 7],
          player: 2,
          id: 3,
        },
      },
    })
  }
  const updateStatusOfHero = (
    heroUpdated: ISingleHeroStats,
    heroStatus: IHeroStatus,
  ) => {
    const updatedStatus = produce(heroStatus, (draft) => {
      if (heroStatus && draft) {
        draft[`player${heroUpdated.player}`][`hero${heroUpdated.id}`] =
          heroUpdated
      }
    })
    setHeroStatus(updatedStatus)
  }
  const updateHero = (hero: ISingleHeroStats): UpdateMethods => {
    const updateStat = (stat: Stats, q: number) => {
      const heroUpdated = produce(hero, (draft) => {
        draft.hero[stat] = draft.hero[stat] + q
      })
      return heroUpdated
    }
    const updatePos = (pos: number[]) => {
      const heroUpdated = produce(hero, (draft) => {
        draft.position = pos
      })
      return heroUpdated
    }
    const methods: UpdateMethods = {
      power: (q: number) => updateStat(Stats.POWER, q),
      stamina: (q: number) => updateStat(Stats.STAMINA, q),
      health: (q: number) => updateStat(Stats.HEALTH, q),
      movement: (q: number) => updateStat(Stats.MOVEMENT, q),
      defense: (q: number) => updateStat(Stats.DEFENSE, q),
      position: (pos: number[]) => updatePos(pos),
    }
    return methods
  }
  const log = (str: string) => {
    historical ? setHistorical([str, ...historical]) : setHistorical([str])
  }
  useEffect(() => {
    removeMoveOptions()
    removeAttackOptions()
  }, [heroSelected])

  return (
    <BoardContext.Provider
      value={{
        inGame,
        setInGame,
        player1heroes,
        player2heroes,
        addHero,
        removeHero,
        setPlayer1heroes,
        setPlayer2heroes,
        startGame,
        heroStatus,
        setHeroStatus,
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
        updateHero,
        updateStatusOfHero,
        historical,
        log,
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
