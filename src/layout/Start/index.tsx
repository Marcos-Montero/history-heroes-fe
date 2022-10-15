/* eslint-disable indent */
import { useState } from 'react'
import { useBoard } from '../../context/boardContext'
import { heroes } from '../../constants/heroes'
import { PickCard } from '../../components/molecules/PickCard'
import { IHero } from '../../types'
import { buildTriplet, does } from '../../utils'
import {
  ConfirmButton,
  FinalCardsContainer,
  FinalContainer,
  PickableContainer,
  RandomButton,
  ResetButton,
  StartButton,
  StartContainer,
} from './style'

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
    <StartContainer>
      {!allHeroesSelected ? (
        <>
          <h1>Pick your 3 heroes:</h1>
          <PickableContainer>
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
          </PickableContainer>
          {selectingPlayer === 1 && (
            <ConfirmButton
              onClick={handleConfirmTeam}
              disabled={selectingPlayer === 1 && player1heroes.length !== 3}
            >
              Confirm Team
            </ConfirmButton>
          )}
          <RandomButton onClick={randomPick}>(?) Random Picks (?)</RandomButton>
        </>
      ) : (
        <FinalContainer>
          <h1>These are the Heroes Selected:</h1>
          <FinalCardsContainer>
            <h1>Player 1: </h1>
            {Object.entries(player1heroes).map(([k, v], i) => {
              return <PickCard hero={v} key={i} />
            })}
          </FinalCardsContainer>
          <FinalCardsContainer>
            <h1>Player 2: </h1>
            {Object.entries(player2heroes).map(([k, v], i) => {
              return <PickCard hero={v} key={i} />
            })}
          </FinalCardsContainer>
          <StartButton onClick={() => startGame()}>Start Game</StartButton>
          <ResetButton onClick={handleReset}>⬅️Pick again</ResetButton>
        </FinalContainer>
      )}
    </StartContainer>
  )
}
