import { cloneElement, SVGProps } from 'react'
import { HeroesNames, RolesNames } from '../types'

import { ReactComponent as NefertitiSVG } from './nefertiti.svg'
import { ReactComponent as LeonidasSVG } from './leonidas.svg'
import { ReactComponent as AttilaSVG } from './attila.svg'
import { ReactComponent as MariCurieSVG } from './mariCurie.svg'
import { ReactComponent as DaVinciSVG } from './daVinci.svg'
import { ReactComponent as BachSVG } from './bach.svg'
import { ReactComponent as SunTzuSVG } from './sunTzu.svg'
import { ReactComponent as CleopatraSVG } from './cleopatra.svg'
import { ReactComponent as IsabelSVG } from './isabel.svg'

import { ReactComponent as RulerSVG } from './ruler.svg'
import { ReactComponent as WarriorSVG } from './tank.svg'
import { ReactComponent as ArtistSVG } from './artist.svg'
import { ReactComponent as ThinkerSVG } from './thinker.svg'
import { ReactComponent as MoveSVG } from './move.svg'
import { ReactComponent as AttackSVG } from './attack.svg'

import { ReactComponent as AddSVG } from './add.svg'
import { ReactComponent as RemoveSVG } from './remove.svg'
import { ReactComponent as UsersSVG } from './users.svg'

type IAttacks = 'move' | 'attack'
type IMisc = 'add' | 'remove' | 'users'

interface ISvg extends SVGProps<SVGSVGElement> {
  name: HeroesNames | RolesNames | IMisc | IAttacks
}

const svgs = {
  // Heroes
  nefertiti: <NefertitiSVG />,
  leonidas: <LeonidasSVG />,
  attila: <AttilaSVG />,
  mariCurie: <MariCurieSVG />,
  daVinci: <DaVinciSVG />,
  sunTzu: <SunTzuSVG />,
  bach: <BachSVG />,
  cleopatra: <CleopatraSVG />,
  isabel: <IsabelSVG />,

  // Roles
  ruler: <RulerSVG />,
  warrior: <WarriorSVG />,
  thinker: <ThinkerSVG />,
  artist: <ArtistSVG />,

  // Misc
  add: <AddSVG />,
  remove: <RemoveSVG />,
  users: <UsersSVG />,

  // Attacks
  move: <MoveSVG />,
  attack: <AttackSVG />,
}

export const Svg = ({ name, ...props }: ISvg) => {
  const Component = svgs[name]
  return cloneElement(Component, { ...props })
}
