import { useBoard } from '../../../context/boardContext'
import s from './style.module.sass'

export const HistoricalPanel = () => {
  const { historical } = useBoard()
  if (!historical) {
    return null
  }
  return (
    <div className={s.historicalContainer}>
      {historical.map((v: string, i: number) => (
        <p key={i}>{v}</p>
      ))}
    </div>
  )
}
