/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHero = /* GraphQL */ `
  query GetHero($id: ID!) {
    getHero(id: $id) {
      id
      name
      role
      power
      health
      resources
      defense
      movement
      createdAt
      updatedAt
    }
  }
`;
export const listHeroes = /* GraphQL */ `
  query ListHeroes(
    $filter: ModelHeroFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeroes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        role
        power
        health
        resources
        defense
        movement
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
