import { useBoard } from '../../../context/boardContext'
import { ButtonEndTurn, PlayerCardContainer } from './style'
export const PlayerCard = ({ p }: { p: 1 | 2 }) => {
  const { turn, toggleTurn } = useBoard()
  return (
    <PlayerCardContainer p={p} enabled={turn === p}>
      <h2>Player {p}</h2>
      <ButtonEndTurn show={turn === p} onClick={toggleTurn}>
        End Turn
      </ButtonEndTurn>
    </PlayerCardContainer>
  )
}
