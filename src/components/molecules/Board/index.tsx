import { Square } from '../Square'
import s from './style.module.sass'

interface IBoard {
  squareNumber: number
}
export const Board = ({ squareNumber }: IBoard) => {
  let xAxis = 1
  let yAxis = 0
  return (
    <div className={s.boardContainer}>
      {Array.from({ length: squareNumber }).map((v, i) => {
        if (yAxis < 7) {
          yAxis++
        } else {
          yAxis = 1
          xAxis++
        }
        return <Square key={i} position={[xAxis, yAxis]} />
      })}
    </div>
  )
}
