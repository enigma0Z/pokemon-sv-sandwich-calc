import { DisplayRequirement, Ingredient, MealPower, PokemonType, PowerRequirement, Sandwich, SandwichPower, SandwichStats, Taste } from './Cookbook'
import { findRecipe, MealPowers, PokemonTypes, Tastes, templateResult } from './Cookbooks'

/* 
Note to self regarding these sort functions.
For a given fn(a, b)
- A negative value means a is sorted before b
- A positive value means b is sorted before a
- Zero means that a and b are equivalent and original sort order is preserved

Typically this is implemented with a function like fn(a, b) { return a - b }
Reverse sort would simply reverse the operands, { return b - a }
Because these are a priority sort (value, then something else), and the value has priority, it's multiplied by 10 
to prevent off-by-one errors where, for instance, numerically, an descending order sort for fn(5, 6) would put 6 first.
In certain scenarios, (we're starting with 6 - 5, so 1) where the name value of whatever is "5" comes before the name
value of "6", this would turn the 1 into a zero, preserving the original order which is not the intended result.
*/

export const LEVEL_REQUIREMENTS: { [index: number]: { type: number, power: number } } = {
  1: {
    type: 1,
    power: 1
  },
  2: {
    type: 180,
    power: 100
  },
  3: {
    type: 180,
    power: 2000
  }
}

export const MULTI_SLOT_TYPE_REQUIREMENTS = {
  2: 280,
  3: 480
}

export function sortValueName(a: { name: string, value: number }, b: { name: string, value: number }) {
  return (b.value - a.value) * 10 + (a.name < b.name ? -1 : 1)
}

export function sortValueTaste(a: { name: string, value: number }, b: { name: string, value: number }) {
  return (b.value - a.value) * 10 + (Tastes.indexOf(a.name as Taste) < Tastes.indexOf(b.name as Taste) ? -1 : 1)
}

export function sortValueType(a: { name: string, value: number }, b: { name: string, value: number }) {
  return (b.value - a.value) * 10 + (PokemonTypes.indexOf(a.name as PokemonType) < PokemonTypes.indexOf(b.name as PokemonType) ? -1 : 1)
}

export function sortValuePower(a: { name: string, value: number }, b: { name: string, value: number }) {
  return (b.value - a.value) * 10 + (MealPowers.indexOf(a.name as MealPower) < MealPowers.indexOf(b.name as MealPower) ? -1 : 1)
}

export function sortAttributes(object: Ingredient['taste'] | Ingredient['power'] | Ingredient['type'], sortFn = sortValueName) {
  return Object.keys(object)
    .map((key) => { return { name: key, value: object[key] } })
    .sort(sortFn)
}

export function powerName(power: SandwichPower) {
  let desc = `${power.name} Power`
  if (power.name.toLowerCase() !== 'egg') desc += `: ${power.type}`
  desc += `, Lv. ${power.level}`
  return desc
}

export function calculateLevel(power: { name: string, value: number }, type: { name: string, value: number }) {
  if (type.value >= LEVEL_REQUIREMENTS[2].type) {
    if (power.value >= LEVEL_REQUIREMENTS[3].power) {
      return 3
    } else if (power.value >= LEVEL_REQUIREMENTS[2].power) {
      return 2
    } else {
      return 1
    }
  } else {
    return 1
  }
}

function sumComponents(ingredients: Ingredient[]): SandwichStats {
  const Result = templateResult()

  // Add everything together
  for (let ingredient of ingredients) {
    const Multiplier = ingredient.numPieces !== undefined ? ingredient.numPieces : ingredient.maxPieces
    for (let key of Object.keys(ingredient.taste)) {
      Result.taste[key] += ingredient.taste[key] * Multiplier
    }
    for (let key of Object.keys(ingredient.power)) {
      Result.power[key] += ingredient.power[key] * Multiplier
    }
    for (let key of Object.keys(ingredient.type)) {
      Result.type[key] += ingredient.type[key] * Multiplier
    }
  }

  return Result
}

export function sumComponentData(components: Ingredient[]) {
  const Result = templateResult()

  for (let component of components) {
    for (let key of Object.keys(component.taste)) {
      Result.taste[key] += component.taste[key]
    }
    for (let key of Object.keys(component.power)) {
      Result.power[key] += component.power[key]
    }
    for (let key of Object.keys(component.type)) {
      Result.type[key] += component.type[key]
    }
  }

  return Result
}

export function addFlavorResult(sandwich: SandwichStats) {
  // Taste Powers
  const SortedTastes = sortAttributes(sandwich.taste, sortValueTaste)

  let bonus = 100;

  if (
    (SortedTastes[0].name === 'Sour' && SortedTastes[1].name === 'Sweet')
    || (SortedTastes[0].name === 'Sweet' && SortedTastes[1].name === 'Sour')
  ) {
    if (sandwich.power['Catching'] === undefined) {
      sandwich.power['Catching'] = 0
    }

    sandwich.power['Catching'] += bonus
  } else if (
    (SortedTastes[0].name === 'Bitter' && SortedTastes[1].name === 'Salty')
    || (SortedTastes[0].name === 'Salty' && SortedTastes[1].name === 'Bitter')
  ) {
    if (sandwich.power['Exp.'] === undefined) {
      sandwich.power['Exp.'] = 0
    }
    sandwich.power['Exp.'] += bonus
  } else if (
    (SortedTastes[0].name === 'Hot' && SortedTastes[1].name === 'Sweet')
    || (SortedTastes[0].name === 'Sweet' && SortedTastes[1].name === 'Hot')
  ) {
    if (sandwich.power['Raid'] === undefined) {
      sandwich.power['Raid'] = 0
    }
    sandwich.power['Raid'] += bonus
  } else if (SortedTastes[0].value > 15) {
    if (SortedTastes[0].name === 'Sweet') {
      if (sandwich.power['Egg'] === undefined) {
        sandwich.power['Egg'] = 0
      }
      sandwich.power['Egg'] += bonus
    } else if (SortedTastes[0].name === 'Hot') {
      if (sandwich.power['Humungo'] === undefined) {
        sandwich.power['Humungo'] = 0
      }
      sandwich.power['Humungo'] += bonus
    } else if (SortedTastes[0].name === 'Bitter') {
      if (sandwich.power['Item Drop'] === undefined) {
        sandwich.power['Item Drop'] = 0
      }
      sandwich.power['Item Drop'] += bonus
    } else if (SortedTastes[0].name === 'Sour') {
      if (sandwich.power['Teensy'] === undefined) {
        sandwich.power['Teensy'] = 0
      }
      sandwich.power['Teensy'] += bonus
    } else if (SortedTastes[0].name === 'Salty') {
      if (sandwich.power['Encounter'] === undefined) {
        sandwich.power['Encounter'] = 0
      }
      sandwich.power['Encounter'] += bonus
    }
  }

  return sandwich
}

export function combineComponents(ingredients: SandwichStats, seasonings: SandwichStats) {
  const Result = templateResult()

  // Combine tastes
  for (let key of Object.keys(ingredients.taste)) {
    if (Result.taste[key] === undefined) {
      Result.taste[key] = ingredients.taste[key]
    } else {
      Result.taste[key] += ingredients.taste[key]
    }
  }

  for (let key of Object.keys(seasonings.taste)) {
    if (Result.taste[key] === undefined) {
      Result.taste[key] = seasonings.taste[key]
    } else {
      Result.taste[key] += seasonings.taste[key]
    }
  }

  // Combine powers
  for (let key of Object.keys(ingredients.power)) {
    if (Result.power[key] === undefined) {
      Result.power[key] = ingredients.power[key]
    } else {
      Result.power[key] += ingredients.power[key]
    }
  }

  for (let key of Object.keys(seasonings.power)) {
    if (Result.power[key] === undefined) {
      Result.power[key] = seasonings.power[key]
    } else {
      Result.power[key] += seasonings.power[key]
    }
  }

  // Combine types
  for (let key of Object.keys(ingredients.type)) {
    if (Result.type[key] === undefined) {
      Result.type[key] = ingredients.type[key]
    } else {
      Result.type[key] += ingredients.type[key]
    }
  }

  for (let key of Object.keys(seasonings.type)) {
    if (Result.type[key] === undefined) {
      Result.type[key] = seasonings.type[key]
    } else {
      Result.type[key] += seasonings.type[key]
    }
  }

  return Result
}

export function calculateSandwich(ingredients: (Ingredient | undefined)[], seasonings: (Ingredient | undefined)[]): Sandwich {
  const calcSandwich: Sandwich = {
    name: undefined,
    description: undefined,
    location: undefined,
    number: undefined,
    stats: undefined,
    ingredients: ingredients.filter(x => x !== null && x !== undefined) as Ingredient[],
    seasonings: seasonings.filter(x => x !== null && x !== undefined) as Ingredient[],
    powers: [],
    stars: 3
  }

  console.log('calculateSandwich()', ingredients)

  const foundSandwich = findRecipe(ingredients.map(x => x?.name), seasonings.map(x => x?.name))
  if (foundSandwich) {
    calcSandwich.name = foundSandwich.name
    calcSandwich.description = foundSandwich.description
    calcSandwich.location = foundSandwich.location
    calcSandwich.number = foundSandwich.number
    calcSandwich.powers = foundSandwich.powers
    return calcSandwich
  }

  const IngredientSum: SandwichStats = sumComponents(calcSandwich.ingredients)
  const SeasoningSum: SandwichStats = sumComponents(calcSandwich.seasonings)
  const SandwichSum: SandwichStats = combineComponents(IngredientSum, SeasoningSum)

  addFlavorResult(SandwichSum)

  calcSandwich.stats = SandwichSum

  let herbaMysticaTotal = 0;
  for (let seasoning of calcSandwich.seasonings) {
    if (seasoning.name.toLowerCase().endsWith('herba mystica')) herbaMysticaTotal += 1
  }

  if (herbaMysticaTotal === 1) { // Sparkling power only activates on two herba
    SandwichSum.power.Sparkling = 0
  }

  const SortedPower = sortAttributes(SandwichSum.power, sortValuePower)
  const SortedType = sortAttributes(SandwichSum.type, sortValueType)

  let type = []

  // Do type sorting and check for monotype
  if (SortedType[0].value < MULTI_SLOT_TYPE_REQUIREMENTS[2]) {
    type = [0, 2, 1] // Most sandwiches are 0, 2, 1
  } else if (SortedType[0].value < MULTI_SLOT_TYPE_REQUIREMENTS[3]) {
    type = [0, 0, 2]
  } else {
    type = [0, 0, 0]
  }

  // Calculate initial levels
  let levels = [
    calculateLevel(SortedPower[0], SortedType[type[0]]),
    calculateLevel(SortedPower[1], SortedType[type[1]]),
    calculateLevel(SortedPower[2], SortedType[type[2]]),
  ]

  // Do Herba Mystica overrides for level
  if (herbaMysticaTotal === 1) {
    if (levels[0] < 2) levels[0] = 2
    if (levels[1] < 2) levels[1] = 2

  } else if (herbaMysticaTotal > 1) {
    if (levels[0] < 3) levels[0] = 3
    if (levels[1] < 3) levels[1] = 3
    if (levels[2] < 3) levels[2] = 3
  } else if (
    // TODO This is hardcoded for sp, needs a var
    calcSandwich.ingredients.length === 6 // If there's six ingredients
    && calcSandwich.ingredients.filter((ingredient) => ingredient.name !== ingredients[0]?.name).length === 0 // And they're all the same
    && calcSandwich.ingredients[0].maxPieces === 1 // And each one is a big ingredient
    && levels[0] > 1 // And there's enough  to have made the first power lv. 2
  ) { // ... Then elevate poer 2 by one level
    if (levels[1] === 1) {
      levels[1] += 1
    }
  }

  // Types 2 and 3 are switched vs power order
  calcSandwich.powers.push(
    { name: SortedPower[0].name, type: SortedType[type[0]].name, level: levels[0] },
    { name: SortedPower[1].name, type: SortedType[type[1]].name, level: levels[1] },
    { name: SortedPower[2].name, type: SortedType[type[2]].name, level: levels[2] },
  )

  // Check for too many ingredients. Current working theory: too many
  // ingredients results in reduced levels but not altered poweres
  const ingredientCheck: { ingredient: Ingredient, totalPieces: number }[][] = []

  let runningTotal = -1 
  let player = -1 
  for (let ingredient of ingredients) {
    runningTotal += 1
    runningTotal %= 6
    if (runningTotal === 0) {
      player += 1
      ingredientCheck.push([])
    }

    if (ingredient === undefined) continue

    if (ingredientCheck[player].map(x => x.ingredient.name).includes(ingredient.name as string))
      continue

    const newCheck = { ingredient: ingredient, totalPieces: 0 }

    for (let foundIngredient of ingredients.slice(player*6, (player+1)*6).filter(x => x !== undefined && x.name === ingredient?.name)) {
      if (foundIngredient) {
        if (foundIngredient?.numPieces)
          newCheck.totalPieces += foundIngredient.numPieces
        else
          newCheck.totalPieces += foundIngredient.maxPieces
      }
    }

    ingredientCheck[player].push(newCheck)
  }

  for (let player of ingredientCheck) {
    for (let check of player) {
      if (check.totalPieces > 13) {
        calcSandwich.warning = true
      }
    }
  }

  return calcSandwich
}

export function powerRequirements(powers: SandwichPower[], sandwich?: Sandwich): DisplayRequirement[] {
  const requirements: PowerRequirement[] = []
  for (let power of powers) {
    const requirement: PowerRequirement = {
      power: power,
      powerAmount: 0,
      typeAmount: 0
    }

    if (requirement.power.level === 3) {
      requirement.powerAmount = LEVEL_REQUIREMENTS[3].power
      requirement.typeAmount = LEVEL_REQUIREMENTS[3].type
    } else if (requirement.power.level === 2) {
      requirement.powerAmount = LEVEL_REQUIREMENTS[2].power
      requirement.typeAmount = LEVEL_REQUIREMENTS[2].type
    } else if (requirement.power.level === 1) {
      requirement.powerAmount = LEVEL_REQUIREMENTS[1].power
      requirement.typeAmount = LEVEL_REQUIREMENTS[1].type
    }

    const numOfType = powers.filter(x => x.type !== null && x.type !== undefined && x.type === power.type).length

    if (numOfType === 2) {
      requirement.typeAmount = MULTI_SLOT_TYPE_REQUIREMENTS[2]
    } else if (numOfType === 3) {
      requirement.typeAmount = MULTI_SLOT_TYPE_REQUIREMENTS[3]
    }

    requirements.push(requirement)
  }

  if (sandwich && sandwich.powers.length > 0) {
    for (let requirement of requirements) {
      if (requirement.power.name) {
        requirement.powerAmount -= sandwich.stats?.power[requirement.power.name] as number
      }

      if (requirement.power.type) {
        requirement.typeAmount -= sandwich.stats?.type[requirement.power.type] as number
      }
    }
  }

  const displayRequirements: DisplayRequirement[] = []
  for (let requirement of requirements) {
    let displayRequirement: DisplayRequirement = {
      power: requirement.power,
      components: []
    }

    // TODO: Cleanup the branches in this logic
    if (sandwich && sandwich.powers.length > 0) {
      // Filter by type
      // Find the power of the given power name we're looking for
      const powerByName = sandwich.powers.find(power => power.name === requirement.power.name)

      displayRequirement.components.push({
        name: 'Has Power',
        value: requirement.power.name,
        success: powerByName !== undefined
      })

      if (powerByName) { // Sandwich has the required power
        if (requirement.power.type) { // Check for power type
          displayRequirement.components.push({
            name: `${requirement.power.name} Power Type`,
            value: powerByName.type as string,
            success: powerByName.type === requirement.power.type
          })
        }
      } else {
        displayRequirement.components.push({ // Sandwich does not have the required power
          name: `${requirement.power.name} Power Type`,
          value: 'MISSING',
          success: false
        })
      }

      displayRequirement.components.push({ // df
        name: requirement.power.name,
        value: requirement.powerAmount,
        success: powerByName?.level === requirement.power.level || requirement.powerAmount <= 0
      })
    } else { // Sandwich does not exist yet
      displayRequirement.components.push({
        name: requirement.power.name,
        value: requirement.powerAmount,
        success: requirement.powerAmount <= 0
      })
    }

    if (requirement.power.type) {
      displayRequirement.components.push({
        name: requirement.power.type,
        value: requirement.typeAmount,
        success: requirement.typeAmount <= 0
      })
    }

    displayRequirements.push(displayRequirement)
  }

  return displayRequirements
}