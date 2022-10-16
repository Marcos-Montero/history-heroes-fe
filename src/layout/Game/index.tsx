import { HistoricalPanel } from '../../components/molecules/Historical'
import { StatsPanel } from '../../components/molecules/StatsPanel'
import { Main } from '../Main'
import styled from 'styled-components'

const GameContainer = styled.div``
export const Game = () => {
  return (
    <GameContainer>
      <Main />
      <StatsPanel />
      <HistoricalPanel />
    </GameContainer>
  )
}
