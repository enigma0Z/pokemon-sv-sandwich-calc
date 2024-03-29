import { Cookbook, Ingredient, MealPower, PokemonType, Recipe, SandwichStats, Taste } from './Cookbook'
import _CustomCookbook from './cookbook.json'
import _InGameCookbook from './recipe.json'
import _Sandwich from './sandwich.json'

export const CustomCookbook: Cookbook = _CustomCookbook
export const InGameCookbook: Cookbook = _InGameCookbook
export const Ingredients: Ingredient[] = _Sandwich.ingredients
export const Seasonings: Ingredient[] = _Sandwich.seasonings

const sizeMap: {
  [index: number]: string
} = {
  36: 'Large Three Piece',
  30: 'Big One-Piecers',
  21: 'Medium Three Piece',
  20: 'Medium One-Piecers'
}

export function ingredientTags(ingredient: Ingredient): string[] {
  const tags: string[] = []

  const keys = Object.keys(ingredient.type)

  if (keys.length === 1) {
    tags.push('Mono-type')
  } else if (keys.length === 18) {
    tags.push('All Types')
  }

  const size = ingredient.type[keys[0]] * ingredient.maxPieces
  if (size in sizeMap) {
    tags.push(sizeMap[size])
  }

  return tags 
}

export const PokemonTypes: PokemonType[] = [
  'Normal',
  'Fighting',
  'Flying',
  'Poison',
  'Ground',
  'Rock',
  'Bug',
  'Ghost',
  'Steel',
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Psychic',
  'Ice',
  'Dragon',
  'Dark',
  'Fairy',
]

export const MealPowers: MealPower[] = [
  'Egg',
  'Catching',
  'Exp.',
  'Item Drop',
  'Raid',
  'Title',
  'Sparkling',
  'Humungo',
  'Teensy',
  'Encounter',
]

export const MealPowerSynonyms: { [index: string]: string[] } = {
  'Egg': ['eg'],
  'Catching': ['catch'],
  'Exp.': ['exp', 'experience'],
  'Item Drop': ['item', 'drop', 'itemdrop'],
  'Raid': [],
  'Title': ['mark'],
  'Sparkling': ['shiny', 'sparkle'],
  'Humungo': ['large', 'huge', 'big'],
  'Teensy': ['tiny', 'small', 'itsy'],
  'Encounter': ['enc'],
}

export const LevelSynonyms: { [index: number]: string[] } = {
  1: ['one'],
  2: ['two'],
  3: ['three'],
}

export const Tastes: Taste[] = [
  'Sweet',
  'Salty',
  'Sour',
  'Bitter',
  'Hot',
]

export const TastePowerBonus: { taste: Taste[], power: MealPower }[] = [
  {
    taste: ['Sweet', 'Sour'],
    power: 'Catching'
  }, {
    taste: ['Sweet', 'Hot'],
    power: 'Raid'
  }, {
    taste: ['Salty', 'Bitter'],
    power: 'Exp.'
  }, {
    taste: ['Sweet'],
    power: 'Egg'
  }, {
    taste: ['Salty'],
    power: 'Encounter'
  }, {
    taste: ['Sour'],
    power: 'Teensy'
  }, {
    taste: ['Bitter'],
    power: 'Item Drop'
  }, {
    taste: ['Hot'],
    power: 'Humungo'
  }
]

export function templateResult(): SandwichStats {
  return {
    taste: {
      'Sweet': 0,
      'Salty': 0,
      'Sour': 0,
      'Bitter': 0,
      'Hot': 0,
    },
    power: {
      'Egg': 0,
      'Catching': 0,
      'Exp.': 0,
      'Item Drop': 0,
      'Raid': 0,
      'Title': 0,
      'Sparkling': 0,
      'Humungo': 0,
      'Teensy': 0,
      'Encounter': 0,
    },
    type: {
      'Normal': 0,
      'Fire': 0,
      'Water': 0,
      'Electric': 0,
      'Grass': 0,
      'Ice': 0,
      'Fighting': 0,
      'Poison': 0,
      'Ground': 0,
      'Flying': 0,
      'Psychic': 0,
      'Bug': 0,
      'Rock': 0,
      'Ghost': 0,
      'Dragon': 0,
      'Dark': 0,
      'Steel': 0,
      'Fairy': 0,
    }
  }
}

export function findRecipe(ingredients: (Ingredient | null | undefined)[], seasonings: (Ingredient | null | undefined)[]): Recipe | void {
  let ingredientsStr = ingredients.map(x => x ? x.name : '').sort().toString()
  let seasoningsStr = seasonings.map(x => x ? x.name : '').sort().toString()

  let ingredientsQtyStr = ingredients.map(x => x ? `${x.name}:${x.numPieces}` : '').sort().toString()

  for (let cookbook of [InGameCookbook, CustomCookbook]) {
    for (let recipe of cookbook.recipes) {
      if (
        (recipe.ingredients.sort().toString() === ingredientsStr
          || recipe.ingredients.sort().toString() === ingredientsQtyStr
        ) && recipe.seasonings.sort().toString() === seasoningsStr
      ) {
        return recipe
      }
    }
  }

  return undefined
}