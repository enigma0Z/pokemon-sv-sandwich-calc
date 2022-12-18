import { Cookbook, Ingredient, MealPower, PokemonType, SandwichStats, Taste } from './Cookbook'
import _CustomCookbook from './cookbook.json'
import _InGameCookbook from './recipe.json'
import _Sandwich from './sandwich.json'

export const CustomCookbook: Cookbook = _CustomCookbook
export const InGameCookbook: Cookbook = _InGameCookbook
export const Ingredients: Ingredient[] = _Sandwich.ingredients
export const Seasonings: Ingredient[] = _Sandwich.seasonings

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