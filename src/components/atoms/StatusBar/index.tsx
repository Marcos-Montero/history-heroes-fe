import { useEffect, useState } from 'react'
import s from './style.module.sass'

type IStatusBar = {
  label: 'stamina' | 'health' | 'power' | 'movement'
  value: number
  generic?: boolean
}
export const StatusBar = ({ label, value, generic = false }: IStatusBar) => {
  const [color, setColor] = useState('')
  useEffect(() => {
    if (label === 'stamina') {
      setColor('blue')
    } else if (label === 'health') {
      setColor('green')
    } else if (label === 'power') {
      setColor('#e22')
    } else if (label === 'movement') {
      setColor('#bb1')
    }
  }, [])
  const backgroundColor = generic ? color : 'rgba(0,0,0,.1)'
  return (
    <div
      className={s.statusBarContainer}
      style={{
        background: backgroundColor,
      }}
    >
      <div>
        <p className={s.statusValue}>{value}</p>
      </div>
      {Array.from({ length: value }).map((v, i) => (
        <div
          className={generic ? '' : s.fill}
          style={{ background: color }}
          key={i}
        />
      ))}
    </div>
  )
}
