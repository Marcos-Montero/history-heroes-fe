import s from './style.module.sass'
import classNames from 'classnames'
import { useState } from 'react'
import { HeroSlide } from '../../components/molecules/HeroSlide'
import { Svg } from '../../svg'
import { useBoard } from '../../context/boardContext'

export const Right = () => {
  const { player1heroes, player2heroes } = useBoard()
  const [wrap, setWrap] = useState(false)

  return (
    <div className={classNames(s.rightContainer, wrap && s.closed)}>
      <div className={s.rightBar} />
      <div className={classNames(s.cardSectionContainer, wrap && s.closed)}>
        <button
          className={classNames(s.wrapButton, wrap && s.closed)}
          onClick={() => setWrap(!wrap)}
        >
          <div className={s.buttonContent}>
            {!wrap ? (
              <Svg name="remove" height={30} width={30} color={'orange'} />
            ) : (
              <>
                <Svg name="users" height={20} width={20} color={'orange'} />
                <p>Teams</p>
              </>
            )}
          </div>
        </button>
        {!wrap && (
          <>
            <div className={s.player1Container}>
              {Object.entries(player1heroes).map(([k, v], i) => (
                <HeroSlide hero={v} key={i} />
              ))}
            </div>
            <div className={s.player2Container}>
              {Object.entries(player2heroes).map(([k, v], i) => (
                <HeroSlide hero={v} key={i} right />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
