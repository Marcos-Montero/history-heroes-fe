import { useState, useEffect } from 'react'
import { getHeroes, IHeroDB } from '../../api/getHeroes'
import { formatName } from '../../utils'
import s from './style.module.sass'
export const AdminPanel = () => {
  const [heroes, setHeroes] = useState<IHeroDB[] | undefined>()
  const handleSaveHero = (hero: IHeroDB) => {
    const {
      name: rawName,
      power,
      health,
      resources,
      movement,
      defense,
      role,
    } = hero
    const name = formatName(rawName)
    alert(
      `Saving ${name} - ${role} (${power} ${health} ${resources} ${movement} ${defense})`,
    )
  }
  useEffect(() => {
    getHeroes().then((heroes) => {
      setHeroes(heroes)
    })
  })
  return (
    <div className={s.adminContainer}>
      <h1>Admin Panel</h1>
      <div className={s.heroesContainer}>
        {heroes?.map((hero, i) => (
          <div key={i}>
            <h4>{formatName(hero.name)}</h4>
            <p className={s.id}>{hero.id}</p>
            <div className={s.attrContainer}>
              <label htmlFor="Role">Role</label>
              <select name="Role" id="Role">
                <option value={hero.role}>{hero.role}</option>
                {['ruler', 'warrior', 'thinker', 'artist']
                  .filter((role) => role !== hero.role)
                  .map((role, i2) => (
                    <option value={role} key={i2}>
                      {role}
                    </option>
                  ))}
              </select>
            </div>
            {['power', 'health', 'resources', 'movement', 'defense'].map(
              (attr, i2) => (
                <div key={i2} className={s.attrContainer}>
                  <label>{attr}</label>
                  <input
                    className={s.attrInput}
                    type="number"
                    defaultValue={
                      hero[
                        attr as 'power' | 'resources' | 'movement' | 'defense'
                      ]
                    }
                  ></input>
                </div>
              ),
            )}
            <button
              className={s.saveHeroButton}
              onClick={() => handleSaveHero(hero)}
            >
              save
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
