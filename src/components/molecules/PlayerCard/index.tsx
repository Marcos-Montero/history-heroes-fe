import classNames from 'classnames'
import s from './style.module.sass'
export const PlayerCard = ({ p }: { p: 1 | 2 }) => {
  return (
    <div
      className={classNames(
        s.playerCard_container,
        p === 1 ? s['-player1'] : s['-player2'],
      )}
    >
      <h2>Player {p}</h2>
    </div>
  )
}
