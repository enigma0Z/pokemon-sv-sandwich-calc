const xmlHttpReq = new XMLHttpRequest();
xmlHttpReq.open("GET", '/data/sandwich.json', false);
xmlHttpReq.send(null);

export const SandwichData = JSON.parse(xmlHttpReq.responseText);

const PokemonTypes = [
  'Normal',
  'Fire',
  'Water',
  'Electric',
  'Grass',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy',
]

const MealPowers = [
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

function templateResult() {
  return {
    taste: {
      'Sweet': 0,
      'Hot': 0,
      'Bitter': 0,
      'Sour': 0,
      'Salty': 0,
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

export function sortValueName(a, b) {
  return (b.value - a.value) + (a.name < b.name ? -1 : 1)
}

export function sortValueType(a, b) {
  return (b.value - a.value) + (PokemonTypes.indexOf(a.name) < PokemonTypes.indexOf(b.name) ? -1 : 1)
}

export function sortValuePower(a, b) {
  return (b.value - a.value) + (MealPowers.indexOf(a.name) < MealPowers.indexOf(b.name) ? -1 : 1)
}

export function sortAttributes(object, sortFn = sortValueName) {
  return Object.keys(object)
    .map((key) => { return { name: key, value: object[key] } })
    .sort(sortFn)
}

export function lookupIngredientByName(name) {
  return SandwichData.ingredients.find((ingredient) => ingredient.name === name)
}

export function lookupSeasoningByName(name) {
  return SandwichData.seasonings.find((seasoning) => seasoning.name === name)
}

export function sumComponents(components, lookupFunction) {
  const Result = templateResult()
  // Add everything together
  for (let component of components) {
    const ComponentData = lookupFunction(component)
    const Multiplier = ComponentData.max !== undefined ? ComponentData.max : 1
    for (let key of Object.keys(ComponentData.taste)) {
      Result.taste[key] += ComponentData.taste[key] * Multiplier
    }
    for (let key of Object.keys(ComponentData.power)) {
      Result.power[key] += ComponentData.power[key] * Multiplier
    }
    for (let key of Object.keys(ComponentData.type)) {
      Result.type[key] += ComponentData.type[key] * Multiplier
    }
  }

  return Result
}

export function maxComponents(components, lookupFunction) {
  const Result = templateResult()
  // Find the highest values
  for (let component of components) {
    const ComponentData = lookupFunction(component)
    for (let key of Object.keys(ComponentData.taste)) {
      if (Result.taste[key] < ComponentData.taste[key]) {
        Result.taste[key] = ComponentData.taste[key]
      }
    }
    for (let key of Object.keys(ComponentData.power)) {
      if (Result.power[key] < ComponentData.power[key]) {
        Result.power[key] = ComponentData.power[key]
      }
    }
    for (let key of Object.keys(ComponentData.type)) {
      if (Result.type[key] < ComponentData.type[key]) {
        Result.type[key] = ComponentData.type[key]
      }
    }
  }

  return Result
}

export function sumComponentData(components) {
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

export function addFlavorResult(sandwich) {
  // Taste Powers
  const SortedTastes = sortAttributes(sandwich.taste)
  console.log(SortedTastes[0], SortedTastes[1])

  let bonus = 100;
  if (
    SortedTastes[0].name === 'Sour' && SortedTastes[1].name === 'Sweet'
  ) {
    sandwich.power['Catching'] += bonus
  } else if (
    SortedTastes[0].name === 'Bitter' && SortedTastes[1].name === 'Salty'
  ) {
    sandwich.power['Exp'] += bonus
  } else if (
    SortedTastes[0].name === 'Hot' && SortedTastes[1].name === 'Sweet'
  ) {
    sandwich.power['Raid'] += bonus
  } else if (SortedTastes[0].name === 'Sweet') {
    sandwich.power['Egg'] += bonus
  } else if (SortedTastes[0].name === 'Hot') {
    sandwich.power['Humungo'] += bonus
  } else if (SortedTastes[0].name === 'Bitter') {
    sandwich.power['Item Drop'] += bonus
  } else if (SortedTastes[0].name === 'Sour') {
    sandwich.power['Teensy'] += bonus
  } else if (SortedTastes[0].name === 'Salty') {
    sandwich.power['Encounter'] += bonus
  }

  return sandwich
}

export function combineComponents(ingredients, seasonings) {
  const Result = {
    taste: {},
    power: {},
    type: {}
  }

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