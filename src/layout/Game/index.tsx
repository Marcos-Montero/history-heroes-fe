import { HistoricalPanel } from '../../components/molecules/Historical'
import { StatsPanel } from '../../components/molecules/StatsPanel'
import { Main } from '../Main'

export const Game = () => {
  return (
    <div>
      <Main />
      <StatsPanel />
      <HistoricalPanel />
    </div>
  )
}
