import { useBoard } from '../../../context/boardContext'
import s from './style.module.sass'

export const HistoricalPanel = () => {
  const { historical } = useBoard()

  return (
    <div className={s.historicalContainer}>
      {historical &&
        historical.map((v: string, i: number) => <p key={i}>{v}</p>)}
    </div>
  )
}
