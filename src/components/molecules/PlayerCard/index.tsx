import { ButtonEndTurn, PlayerCardContainer } from './style'
export const PlayerCard = ({ p }: { p: 1 | 2 }) => {
  return (
    <PlayerCardContainer p={p} enabled={true}>
      <h2>Player {p}</h2>
      <ButtonEndTurn show={false}>End Turn</ButtonEndTurn>
    </PlayerCardContainer>
  )
}
