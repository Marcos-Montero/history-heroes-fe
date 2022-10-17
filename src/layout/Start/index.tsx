/* eslint-disable indent */
import { useState } from 'react'
import { useBoard } from '../../context/boardContext'
import { heroes } from '../../constants/heroes'
import { PickCard } from '../../components/molecules/PickCard'
import { IHero } from '../../types'
import { buildTriplet, does } from '../../utils'
import s from './style.module.sass'

export const Start = () => {
  const {
    startGame,
    addHero,
    removeHero,
    player1heroes,
    player2heroes,
    setPlayer1heroes,
    setPlayer2heroes,
    resetGame,
  } = useBoard()
  const [selectingPlayer, setSelectingPlayer] = useState(1)
  const [availableHeroes, setAvailableHeroes] = useState<IHero[]>(
    Object.entries(heroes).map(([k, v]) => v),
  )
  const resetAvailableHeroes = () => {
    setAvailableHeroes(Object.entries(heroes).map(([k, v]) => v))
  }
  const changeToPlayer2 = () => {
    setSelectingPlayer(2)
    resetAvailableHeroes()
  }
  const handleConfirmTeam = () => {
    if (selectingPlayer === 1) {
      changeToPlayer2()
    }
  }
  const addHeroToMyTeam = (hero: IHero) => {
    if (
      (selectingPlayer === 1 && player1heroes.length < 3) ||
      (selectingPlayer === 2 && player2heroes.length < 3)
    ) {
      addHero(hero, selectingPlayer)
    }
  }
  const removeHeroFromMyTeam = (hero: IHero) => {
    removeHero(hero, selectingPlayer)
  }
  const generateTeams = () => {
    const heroValues = Object.values(heroes)
    const randomTeam1 = buildTriplet(heroValues)
    const randomTeam2 = buildTriplet(randomTeam1.rest)
    return [randomTeam1, randomTeam2]
  }
  const randomPick = () => {
    const [randomTeam1, randomTeam2] = generateTeams()
    setPlayer1heroes(randomTeam1.triplet)
    setPlayer2heroes(randomTeam2.triplet)
  }
  const handleCardClick = (v: IHero) => {
    if (does(player1heroes).contain(v)) {
      removeHeroFromMyTeam(v)
    } else {
      addHeroToMyTeam(v)
    }
  }
  const handleReset = () => {
    setSelectingPlayer(1)
    resetGame()
  }
  const allHeroesSelected =
    player1heroes.length === 3 && player2heroes.length === 3
  return (
    <div className={s.startContainer}>
      {!allHeroesSelected ? (
        <>
          <h1>Pick your 3 heroes:</h1>
          <div className={s.pickableContainer}>
            {Object.entries(availableHeroes).map(([k, v], i) => {
              return (
                <PickCard
                  hero={v}
                  key={i}
                  onClick={() => handleCardClick(v)}
                  adding
                  chosen={
                    selectingPlayer === 1
                      ? does(player1heroes).contain(v)
                      : does(player2heroes).contain(v)
                  }
                />
              )
            })}
          </div>
          {selectingPlayer === 1 && (
            <button
              className={s.confirmButton}
              onClick={handleConfirmTeam}
              disabled={selectingPlayer === 1 && player1heroes.length !== 3}
            >
              Confirm Team
            </button>
          )}
          <button className={s.randomButton} onClick={randomPick}>
            (?) Random Picks (?)
          </button>
        </>
      ) : (
        <div className={s.finalContainer}>
          <h1>These are the Heroes Selected:</h1>
          <div className={s.finalCardsContainer}>
            <h1>Player 1: </h1>
            {Object.entries(player1heroes).map(([k, v], i) => {
              return <PickCard hero={v} key={i} />
            })}
          </div>
          <div className={s.finalCardsContainer}>
            <h1>Player 2: </h1>
            {Object.entries(player2heroes).map(([k, v], i) => {
              return <PickCard hero={v} key={i} />
            })}
          </div>
          <button className={s.startButton} onClick={() => startGame()}>
            Start Game
          </button>
          <button className={s.resetButton} onClick={handleReset}>
            ⬅️Pick again
          </button>
        </div>
      )}
    </div>
  )
}
