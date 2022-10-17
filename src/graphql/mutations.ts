/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHero = /* GraphQL */ `
  mutation CreateHero(
    $input: CreateHeroInput!
    $condition: ModelHeroConditionInput
  ) {
    createHero(input: $input, condition: $condition) {
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
export const updateHero = /* GraphQL */ `
  mutation UpdateHero(
    $input: UpdateHeroInput!
    $condition: ModelHeroConditionInput
  ) {
    updateHero(input: $input, condition: $condition) {
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
export const deleteHero = /* GraphQL */ `
  mutation DeleteHero(
    $input: DeleteHeroInput!
    $condition: ModelHeroConditionInput
  ) {
    deleteHero(input: $input, condition: $condition) {
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
