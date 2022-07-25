import React, {
  FC,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { IHero } from '../types'

type Props = {
  children?: React.ReactNode
}
type IPosition = number[]
export type ISingleHeroStats = {
  hero: IHero
  position: IPosition
  team: 1 | 2
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
interface Context {
  inGame: boolean
  setInGame: SetStateAction<boolean>
  player1heroes: IHero[]
  player2heroes: IHero[]
  addHero: (hero: IHero, playerNumber: number) => void
  removeHero: (hero: IHero, playerNumber: number) => void
  setPlayer1heroes: Dispatch<SetStateAction<IHero[]>>
  setPlayer2heroes: Dispatch<SetStateAction<IHero[]>>
  startGame: () => void
  heroStatus: IHeroStatus | undefined
  move: (hero: ISingleHeroStats) => { to: (position: IPosition) => void }
}

export const MatchContext = createContext<Context | undefined>(undefined)

export const MatchProvider: FC<Props> = ({ children }) => {
  const [inGame, setInGame] = useState(false)
  const [player1heroes, setPlayer1heroes] = useState<IHero[]>([])
  const [player2heroes, setPlayer2heroes] = useState<IHero[]>([])
  const [heroStatus, setHeroStatus] = useState<IHeroStatus | undefined>(
    undefined,
  )

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
          team: 1,
        },
        hero2: {
          hero: player1heroes[1],
          position: [2, 2],
          team: 1,
        },
        hero3: {
          hero: player1heroes[2],
          position: [2, 1],
          team: 1,
        },
      },
      player2: {
        hero1: {
          hero: player2heroes[0],
          position: [7, 6],
          team: 2,
        },
        hero2: {
          hero: player2heroes[1],
          position: [6, 6],
          team: 2,
        },
        hero3: {
          hero: player2heroes[2],
          position: [6, 7],
          team: 2,
        },
      },
    })
  }
  const moveHeroTo = (hero: ISingleHeroStats, position: IPosition) => {
    const player: 'player1' | 'player2' = `player${hero.team}`
    setHeroStatus({
      ...heroStatus,
      [player]: {
        ...heroStatus[player],
        position,
      },
    })
  }
  const move = (
    hero: ISingleHeroStats,
  ): { to: (position: IPosition) => void } => {
    const methods = {
      to: (position: IPosition) => {
        moveHeroTo(hero, position)
      },
    }
    return methods
  }
  return (
    <MatchContext.Provider
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
        move,
      }}
    >
      {children}
    </MatchContext.Provider>
  )
}
export const useMatch = () => {
  const context = useContext(MatchContext)
  if (context === undefined) {
    throw new Error('useMatch must be used within a provider')
  }
  return context
}
