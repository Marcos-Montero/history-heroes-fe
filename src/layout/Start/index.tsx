/* eslint-disable indent */
import { useState } from 'react'
import { useMatch } from '../../context/matchContext'
import s from './style.module.sass'
import { heroes } from '../../constants/heroes'
import { PickCard } from '../../components/molecules/PickCard'
import { IHero } from '../../types'

export const Start = () => {
  const {
    startGame,
    addHero,
    removeHero,
    player1heroes,
    player2heroes,
    setPlayer1heroes,
    setPlayer2heroes,
  } = useMatch()
  const [selectingPlayer, setSelectingPlayer] = useState(1)
  const [availableHeroes, setAvailableHeroes] = useState<IHero[]>(
    Object.entries(heroes).map(([k, v]) => v),
  )
  const [allHeroesSelected, setAllHeroesSelected] = useState(false)

  const changeToPlayer2 = () => {
    setSelectingPlayer(2)
    setAvailableHeroes(Object.entries(heroes).map(([k, v]) => v))
  }
  const handleConfirmTeam = () => {
    if (selectingPlayer === 1) {
      changeToPlayer2()
    }
    if (selectingPlayer === 2) {
      setAllHeroesSelected(true)
      /*       appear()
       */
    }
  }
  const addHeroToMyTeam = (hero: IHero) => {
    if (
      (selectingPlayer === 1 && player1heroes.length < 3) ||
      (selectingPlayer === 2 && player2heroes.length < 3)
    ) {
      addHero(hero, selectingPlayer)
      setAvailableHeroes(availableHeroes.filter((v) => v.name !== hero.name))
    }
  }
  const removeHeroFromMyTeam = (hero: IHero) => {
    removeHero(hero, selectingPlayer)
    setAvailableHeroes((availableHeroes) => [...availableHeroes, hero])
  }
  const randomPick = () => {
    const heroValues = Object.values(heroes)

    const randomNum = () =>
      parseInt((Math.random() * (heroValues.length - 1)).toFixed(0))

    // eslint-disable-next-line prefer-const
    let randomTriplet1: number[] = []
    // eslint-disable-next-line prefer-const
    let randomTriplet2: number[] = []

    const buildTriplet = (triplet: number[]) => {
      const n: number = randomNum()
      if (!triplet.includes(n)) {
        triplet.push(n)
      }
      if (triplet.length < 3) {
        buildTriplet(triplet)
      }
    }
    buildTriplet(randomTriplet1)
    buildTriplet(randomTriplet2)

    const randomTeam1 = [
      heroValues[randomTriplet1[0]],
      heroValues[randomTriplet1[1]],
      heroValues[randomTriplet1[2]],
    ]
    const randomTeam2 = [
      heroValues[randomTriplet2[0]],
      heroValues[randomTriplet2[1]],
      heroValues[randomTriplet2[2]],
    ]
    setPlayer1heroes(randomTeam1)
    setPlayer2heroes(randomTeam2)
    setAllHeroesSelected(true)
  }

  return (
    <div className={s.startContainer}>
      {!allHeroesSelected ? (
        <div className={s.selectingContainer}>
          <div className={s.messageContainer}></div>
          <div className={s.pickableFrame}>
            <button onClick={randomPick} className={s.randomButton}>
              (?) Random Picks (?)
            </button>
            <h1>Pick your 3 heroes:</h1>
            <div className={s.pickableContainer}>
              {Object.entries(availableHeroes).map(([k, v], i) => {
                return (
                  <PickCard
                    hero={v}
                    key={i}
                    onClick={() => addHeroToMyTeam(v)}
                    adding
                  />
                )
              })}
            </div>
          </div>
          <h3>Team</h3>
          <div className={s.pickedContainer}>
            {selectingPlayer === 1
              ? Object.entries(player1heroes).map(([k, v], i) => {
                  return (
                    <PickCard
                      hero={v}
                      key={i}
                      onClick={() => removeHeroFromMyTeam(v)}
                      removing
                    />
                  )
                })
              : Object.entries(player2heroes).map(([k, v], i) => {
                  return (
                    <PickCard
                      hero={v}
                      key={i}
                      onClick={() => removeHeroFromMyTeam(v)}
                    />
                  )
                })}
          </div>
          <div>
            <button
              className={s.confirmButton}
              onClick={handleConfirmTeam}
              disabled={
                (selectingPlayer === 1 && player1heroes.length !== 3) ||
                (selectingPlayer === 2 && player2heroes.length !== 3)
              }
            >
              Confirm Team
            </button>
          </div>
        </div>
      ) : (
        <>
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
            <button onClick={() => startGame()} className={s.startButton}>
              Start Game
            </button>
          </div>
        </>
      )}
    </div>
  )
}
