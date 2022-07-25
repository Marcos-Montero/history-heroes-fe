import React, {
  FC,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { IHero, IHeroStatus, IPosition, ISingleHeroStats } from '../types'
import produce from 'immer'

type Props = {
  children?: React.ReactNode
}

interface Context {
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

  const move = (
    hero: ISingleHeroStats,
  ): { to: (position: IPosition) => void } => {
    const methods = {
      to: (position: IPosition) => {
        setHeroStatus(
          produce(heroStatus, (draft: IHeroStatus) => {
            draft[`player${hero.player}`][`hero${hero.id}`].position = position
          }),
        )
      },
    }
    return methods
  }
  /*   const attack = (heroAttacked) => {
    const methods = {
      with: (attack) => {
        setHeroStatus(
          produce(heroStatus, (draft: IHeroStatus))=>{
            draft[`player`]
          }
        )
      }
    }
    return methods
  } */
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
