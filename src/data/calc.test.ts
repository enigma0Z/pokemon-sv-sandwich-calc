import { lookupIngredientByName, lookupSeasoningByName } from '.'
import * as calc from './calc'
import { Ingredient, SandwichPower, SandwichStats } from './Cookbook'
import { Ingredients } from './Cookbooks'

/**
 * These are constants.  They shouldn't change unless my fundamental 
 * understanding of the sandwich levels is wrong.
 */
test('level requirements', () => {
  expect(calc.LEVEL_REQUIREMENTS[1].type).toBe(1)
  expect(calc.LEVEL_REQUIREMENTS[1].power).toBe(1)

  expect(calc.LEVEL_REQUIREMENTS[2].type).toBe(180)
  expect(calc.LEVEL_REQUIREMENTS[2].power).toBe(100)

  expect(calc.LEVEL_REQUIREMENTS[3].type).toBe(180)
  expect(calc.LEVEL_REQUIREMENTS[3].power).toBe(2000)
})

/**
 * These are also constants. They shouldn't change unless my fundamental
 * understanding is incorrect
 */
test('multi slot type requirements', () => {
  expect(calc.MULTI_SLOT_TYPE_REQUIREMENTS[2]).toBe(280)
  expect(calc.MULTI_SLOT_TYPE_REQUIREMENTS[3]).toBe(480)
})

test.each(
  [
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3],
    [1, 2, 1],
    [2, 1, 1],
    [3, 1, 1],
    [1, 3, 1],
    [3, 2, 3],
    [2, 3, 2]
  ]
)(
  'level calculations(power: %i, type: %i)',
  (power: number, type: number, expected: number) => {
    expect(calc.calculateLevel(
      { name: 'power', value: calc.LEVEL_REQUIREMENTS[power].power },
      { name: 'type', value: calc.LEVEL_REQUIREMENTS[type].type }
    )).toBe(expected)
  }
)

test.each([
  [ // Basic level 1 sandwich
    [
      'apple'
    ], [
      'butter'
    ], {
      powers: [{
        name: 'Egg',
        type: 'Flying',
        level: 1
      }, {
        name: 'Item Drop',
        type: 'Ice',
        level: 1
      }, {
        name: 'Raid',
        type: 'Steel',
        level: 1
      }]
    }
  ], [ // Lookup sandwich from in-game cookbook
    [
      'banana'
    ], [
      'butter', 'peanut butter'
    ], {
      name: 'Great Peanut Butter Sandwich',
      powers: [{
        name: 'Egg',
        level: 2
      }, {
        name: 'Raid',
        type: 'Electric',
        level: 1
      }, {
        name: 'Exp.',
        type: 'Normal',
        level: 1
      }]
    }
  ], [ // Two HM sandwich
    [
      'avocado'
    ], [
      'salty herba mystica', 'spicy herba mystica'
    ], {
      powers: [{
        name: 'Title',
        type: 'Dragon',
        level: 3
      }, {
        name: 'Sparkling',
        type: 'Dragon',
        level: 3
      }, {
        name: 'Encounter',
        type: 'Dragon',
        level: 3
      }]
    }
  ], [ // Small sandwich
    [
      'cheese'
    ], [
      'olive oil'
    ], {
      powers: [{
        name: 'Item Drop',
        type: 'Ghost',
        level: 1
      }, {
        name: 'Catching',
        type: 'Grass',
        level: 1
      }, {
        name: 'Egg',
        type: 'Fire',
        level: 1
      }]
    }
  ], [ // 2HM sandwich
    [
      'avocado'
    ], [
      'salty herba mystica'
    ], {
      powers: [{
        name: 'Title',
        type: 'Dragon',
        level: 2
      }, {
        name: 'Encounter',
        type: 'Fighting',
        level: 2
      }, {
        name: 'Catching',
        type: 'Normal',
        level: 1
      }]
    }
  ], [ // All large ingredient sandwich
    [
      'rice', 'rice', 'rice', 'rice', 'rice', 'rice'
    ], [
      'butter'
    ], {
      powers: [{
        name: 'Humungo',
        type: 'Normal',
        level: 2
      }, {
        name: 'Egg',
        type: 'Flying',
        level: 2
      }, {
        name: 'Encounter',
        type: 'Fighting',
        level: 1
      }]
    }
  ], [ // Too many pieces
    [
      'banana', 'banana', 'banana', 'banana', 'banana', 'banana'
    ], [
      'butter'
    ], {
      warning: true
    }
  ]
])(
  'sandwich calculations (ingredients: %p, seasonings: %p)',
  (
    ingredients: string[],
    seasonings: string[],
    expected: {
      name?: string,
      powers?: SandwichPower[],
      warning?: boolean
    }
  ) => {
    const actualIngredients: Ingredient[] = []
    const actualSeasonings: Ingredient[] = []

    for (let ingredient of ingredients) {
      const foundIngredient = lookupIngredientByName(ingredient)
      if (foundIngredient) {
        actualIngredients.push(foundIngredient)
      } else {
        throw new Error(`Invalid ingredient ${ingredient}`)
      }
    }

    for (let seasoning of seasonings) {
      const foundSeasoning = lookupSeasoningByName(seasoning)
      if (foundSeasoning) {
        actualSeasonings.push(foundSeasoning)
      } else {
        throw new Error(`Invalid seasoning ${seasoning}`)
      }
    }

    const actual = calc.calculateSandwich(actualIngredients, actualSeasonings)

    if (expected.powers !== undefined) {
      expect(actual.powers).toStrictEqual(expected.powers)
    }
    if (expected.name !== undefined) {
      expect(actual.name).toBe(expected.name)
    }
    if (expected.warning !== undefined) {
      expect(actual.warning).toEqual(expected.warning)
    }
  }
)