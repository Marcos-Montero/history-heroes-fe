import { API } from 'aws-amplify'
import { listHeroes } from '../graphql/queries'
import { IHero } from '../types'
import Observable from 'zen-observable-ts'
export interface IHeroDB extends IHero {
  id: string
  createdAt: string
  updatedAt: string
}
interface getHeroesResponse {
  data?: {
    listHeroes?: {
      items?: IHeroDB[]
    }
  }
}
const instanceOfgetHeroesResponse = (
  object: any,
): object is getHeroesResponse => {
  return object
}
export const getHeroes = async () => {
  const res: getHeroesResponse | Observable<object> = await API.graphql({
    query: listHeroes,
  })
  if (instanceOfgetHeroesResponse(res)) {
    const heroes = res?.data?.listHeroes?.items
    return heroes
  }
}
