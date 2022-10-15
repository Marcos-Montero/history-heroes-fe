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
import { ReactComponent as RestSVG } from './rest.svg'
import { ReactComponent as Hq1SVG } from './hq1.svg'
import { ReactComponent as Hq2SVG } from './hq2.svg'

import { ReactComponent as AddSVG } from './add.svg'
import { ReactComponent as RemoveSVG } from './remove.svg'
import { ReactComponent as UsersSVG } from './users.svg'
import { ReactComponent as BasicArrowSVG } from './basicArrow.svg'

type IActions = 'move' | 'attack' | 'rest'
type IMisc = 'add' | 'remove' | 'users' | 'basicArrow'

interface ISvg extends SVGProps<SVGSVGElement> {
  name: HeroesNames | RolesNames | IMisc | IActions | 'hq1' | 'hq2'
}

const svgs = {
  // Heroes
  nefertiti: <NefertitiSVG />,
  leonidas: <LeonidasSVG />,
  attila: <AttilaSVG />,
  marie_curie: <MariCurieSVG />,
  da_vinci: <DaVinciSVG />,
  sun_tzu: <SunTzuSVG />,
  bach: <BachSVG />,
  cleopatra: <CleopatraSVG />,
  isabel_i: <IsabelSVG />,

  // Roles
  ruler: <RulerSVG />,
  warrior: <WarriorSVG />,
  thinker: <ThinkerSVG />,
  artist: <ArtistSVG />,

  // Actions
  move: <MoveSVG />,
  attack: <AttackSVG />,
  rest: <RestSVG />,

  // HQs
  hq1: <Hq1SVG />,
  hq2: <Hq2SVG />,

  // Misc
  add: <AddSVG />,
  remove: <RemoveSVG />,
  users: <UsersSVG />,
  basicArrow: <BasicArrowSVG />,
}

export const Svg = ({ name, ...props }: ISvg) => {
  const Component = svgs[name]
  return cloneElement(Component, { ...props })
}
