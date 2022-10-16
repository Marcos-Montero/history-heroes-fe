import { useBoard } from '../../../context/boardContext'
import { Svg } from '../../../svg'
import s from './style.module.sass'
export const RestAction = () => {
  const { heroSelected, updateHero } = useBoard()
  const handleRest = () => {
    heroSelected && updateHero(heroSelected).resources(+200)
  }
  return (
    <div className={s.restAction_container} onClick={handleRest}>
      <Svg
        name="rest"
        className={s.icon}
        fill={'white'}
        width={600}
        height={600}
      />
    </div>
  )
}
