import { API } from 'aws-amplify'
import { IHero } from '../types'
import { createHero as createHeroMutation } from '../graphql/mutations'

export const createHero = async (hero: IHero) => {
  await API.graphql({
    query: createHeroMutation,
    variables: {
      input: { ...hero },
    },
  })
}
