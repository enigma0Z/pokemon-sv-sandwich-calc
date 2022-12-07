import {
  SandwichData,
  lookupIngredientByName, lookupSeasoningByName, sumComponents,
  sortValueName, addFlavorResult, combineComponents, sortValueType, calculateSandwich, sortValuePower, sortValueTaste
} from './calc.js'

function getIngredientSelects() {
  return document.getElementById('ingredients').getElementsByTagName('select')
}

function getSeasoningSelects() {
  return document.getElementById('seasonings').getElementsByTagName('select')
}

function getIngredients() {
  let ingredients = []
  // Get ingredients from select boxes
  for (let element of getIngredientSelects()) {
    if (element.value !== '') {
      ingredients.push(element.value)
    }
  }

  return ingredients
}

function getSeasonings() {
  let seasonings = []
  // Get seasonings from select boxes
  for (let element of getSeasoningSelects()) {
    if (element.value !== '') {
      seasonings.push(element.value)
    }
  }

  return seasonings
}

function setIngredients(ingredients) {
  const selects = getIngredientSelects()
  for (let i = 0; i < ingredients.length; i++) {
    selects[i].value = lookupIngredientByName(ingredients[i]).name
    selects[i].oninput()
  }
}

function setSeasonings(seasonings) {
  const selects = getSeasoningSelects()
  for (let i = 0; i < seasonings.length; i++) {
    selects[i].value = lookupSeasoningByName(seasonings[i]).name
    selects[i].oninput()
  }
}

function renderSandwichResult(result) {
  const Ul = document.createElement('ul')
  const Li = [
    document.createElement('li'),
    document.createElement('li'),
    document.createElement('li')
  ]
  Ul.appendChild(Li[0])
  Ul.appendChild(Li[1])
  Ul.appendChild(Li[2])

  for (let i = 0; i < 3; i++) {
    Li[i].innerText = `${result.powers[i].name} Power`
    if (result.powers[i].name !== 'Egg') {
      Li[i].innerText += `: ${result.powers[i].type}`
    }

    Li[i].innerText += `, Lv. ${result.powers[i].level}`
  }

  return Ul
}

function renderAttribute(object, quantity, sortingKind = sortValueName) {
  console.debug('renderAttribute', object, quantity)
  const Table = document.createElement('table')
  for (let item of Object.keys(object)
    .map((key) => { return { name: key, value: object[key] } })
    .sort(sortingKind)
  ) {
    if (item.value === 0) continue;
    const Tr = document.createElement('tr')
    Table.appendChild(Tr)

    const Td1 = document.createElement('td')
    Td1.innerText = item.name
    Tr.appendChild(Td1)

    const Td2 = document.createElement('td')
    Td2.innerText = item.value * quantity
    Tr.appendChild(Td2)
  }
  return Table
}

function renderAttributes(object) {
  console.debug('renderAttributes', object)
  const Quantity = object.max !== undefined ? object.max : 1

  const AttributeDiv = document.createElement('div')
  AttributeDiv.setAttribute('class', 'attributes')

  const TasteDiv = document.createElement('div')
  AttributeDiv.appendChild(TasteDiv)

  const TasteLabel = document.createElement('p')
  TasteLabel.innerText = 'Taste'
  TasteDiv.appendChild(TasteLabel)
  TasteDiv.appendChild(renderAttribute(object.taste, Quantity, sortValueTaste))

  const PowerDiv = document.createElement('div')
  AttributeDiv.appendChild(PowerDiv)

  const PowerLabel = document.createElement('p')
  PowerLabel.innerText = 'Power'
  PowerDiv.appendChild(PowerLabel)
  PowerDiv.appendChild(renderAttribute(object.power, Quantity, sortValuePower))

  const TypeDiv = document.createElement('div')
  AttributeDiv.appendChild(TypeDiv)

  const TypeLabel = document.createElement('p')
  TypeLabel.innerText = 'Type'
  TypeDiv.appendChild(TypeLabel)
  TypeDiv.appendChild(renderAttribute(object.type, Quantity, sortValueType))

  return AttributeDiv
}

// Ingredient Select Element
function ingredientSelect() {
  const SelectDiv = document.createElement('div')
  SelectDiv.setAttribute('class', 'field')
  const SelectElement = document.createElement('select')
  SelectDiv.appendChild(SelectElement)
  const ElementAttributesDiv = document.createElement('div')
  SelectDiv.appendChild(ElementAttributesDiv)

  const NullOption = document.createElement('option')
  NullOption.setAttribute('value', '')
  NullOption.innerText = ''
  SelectElement.appendChild(NullOption)
  SelectElement.oninput = () => {
    ElementAttributesDiv.innerHTML = ''

    if (SelectElement.value != '') {
      const attribute = lookupIngredientByName(SelectElement.value)
      ElementAttributesDiv.appendChild(renderAttributes(attribute))
    }

    updateUri()
    renderSandwich()
  }

  for (let ingredient of SandwichData.ingredients) {
    const OptionElement = document.createElement('option')
    OptionElement.setAttribute('value', ingredient.name)
    OptionElement.innerText = ingredient.name
    SelectElement.appendChild(OptionElement)
  }

  return SelectDiv
}

// Seasoning Select Element
function seasoningSelect() {
  const SelectDiv = document.createElement('div')
  SelectDiv.setAttribute('class', 'field')
  const SelectElement = document.createElement('select')
  SelectDiv.appendChild(SelectElement)
  const ElementAttributesDiv = document.createElement('div')
  SelectDiv.appendChild(ElementAttributesDiv)

  const NullOption = document.createElement('option')
  NullOption.setAttribute('value', '')
  NullOption.innerText = ''
  SelectElement.appendChild(NullOption)

  SelectElement.oninput = () => {
    ElementAttributesDiv.innerHTML = ''

    if (SelectElement.value != '') {
      const attribute = lookupSeasoningByName(SelectElement.value)
      ElementAttributesDiv.appendChild(renderAttributes(attribute))
    }

    updateUri()
    renderSandwich()
  }

  for (let seasoning of SandwichData.seasonings) {
    const OptionElement = document.createElement('option')
    OptionElement.setAttribute('value', seasoning.name)
    OptionElement.innerText = seasoning.name
    SelectElement.appendChild(OptionElement)
  }

  return SelectDiv
}

// Calculate sandwich values
function renderSandwich() {
  const ResultsDiv = document.getElementById('results')
  const ingredients = getIngredients()
  const seasonings = getSeasonings()

  if (ingredients.legnth === 0 || seasonings.length === 0) {
    ResultsDiv.innerHTML = ''
    return
  }

  const IngredientSum = sumComponents(ingredients, lookupIngredientByName)
  const SeasoningSum = sumComponents(seasonings, lookupSeasoningByName)
  const SandwichSum = combineComponents(IngredientSum, SeasoningSum)
  addFlavorResult(SandwichSum)

  ResultsDiv.innerHTML = ''
  ResultsDiv.appendChild(renderSandwichResult(calculateSandwich(ingredients, seasonings)))

  console.debug(SandwichSum)
  const SandwichDiv = document.createElement('div')
  SandwichDiv.setAttribute('class', 'sum')
  const SandwichTitle = document.createElement('div')
  SandwichTitle.innerText = 'Sandwich Sum'
  SandwichDiv.appendChild(SandwichTitle)
  SandwichDiv.appendChild(renderAttributes(SandwichSum))
  ResultsDiv.appendChild(SandwichDiv)
}

function updateUri() {
  let ingredients = getIngredients()
  let seasonings = getSeasonings()
  let queryString = []
  if (ingredients.length > 0) {
    queryString.push(`ingredients=${ingredients.join(',')}`)
  }
  if (seasonings.length > 0) {
    queryString.push(`seasonings=${seasonings.join(',')}`)
  }

  const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${queryString.join('&')}`
  const title = window.location.title
  window.history.replaceState('', title, url)

}

// Draw the UI
export function renderUi() {
  console.log('renderUi()')
  const SandwichUiContainer = document.getElementById('sandwich')

  if (SandwichUiContainer.childNodes.length > 0) {
    return
  }

  const IngredientLabel = document.createElement('div')
  IngredientLabel.setAttribute('class', 'label')
  IngredientLabel.innerText = 'Ingredients'
  SandwichUiContainer.appendChild(IngredientLabel)

  const IngredientDiv = document.createElement('div')
  IngredientDiv.setAttribute('id', 'ingredients')
  SandwichUiContainer.appendChild(IngredientDiv)

  IngredientDiv.appendChild(ingredientSelect())
  IngredientDiv.appendChild(ingredientSelect())
  IngredientDiv.appendChild(ingredientSelect())
  IngredientDiv.appendChild(ingredientSelect())
  IngredientDiv.appendChild(ingredientSelect())
  IngredientDiv.appendChild(ingredientSelect())

  const SeasoningLabel = document.createElement('div')
  SeasoningLabel.setAttribute('class', 'label')
  SeasoningLabel.innerText = 'Seasonings'
  SandwichUiContainer.appendChild(SeasoningLabel)

  const SeasoningDiv = document.createElement('div')
  SeasoningDiv.setAttribute('id', 'seasonings')
  SandwichUiContainer.appendChild(SeasoningDiv)

  SeasoningDiv.appendChild(seasoningSelect())
  SeasoningDiv.appendChild(seasoningSelect())
  SeasoningDiv.appendChild(seasoningSelect())
  SeasoningDiv.appendChild(seasoningSelect())

  const ButtonDiv = document.createElement('div')
  SandwichUiContainer.appendChild(ButtonDiv)

  const ResetButton = document.createElement('button')
  ResetButton.innerText = 'Reset'
  ResetButton.onclick = () => {
    for (let element of IngredientDiv.getElementsByTagName('select')) {
      element.value = ''
      element.oninput()
    }

    for (let element of SeasoningDiv.getElementsByTagName('select')) {
      element.value = ''
      element.oninput()
    }
  }
  ButtonDiv.appendChild(ResetButton)

  const DetailsButton = document.createElement('button')
  DetailsButton.innerText = 'Show Details'
  DetailsButton.onclick = () => {
    // Get the root element
    const Root = document.querySelector(':root')
    const AttributeDisplay = getComputedStyle(Root).getPropertyValue('--attribute-display');

    if (AttributeDisplay == 'none') {
      Root.style.setProperty('--attribute-display', 'flex');
      DetailsButton.innerText = 'Hide Details'
    } else if (AttributeDisplay == 'flex') {
      Root.style.setProperty('--attribute-display', 'none');
      DetailsButton.innerText = 'Show Details'
    }
  }
  ButtonDiv.appendChild(DetailsButton)

  const ResultsDiv = document.createElement('div')
  ResultsDiv.setAttribute('id', 'results')
  SandwichUiContainer.appendChild(ResultsDiv)

  // Load URI
  if (window.location.search !== '') {
    const QueryString = window.location.search.slice(1)
    for (let entry of QueryString.split('&')) {
      let [name, valuesStr] = entry.split('=')
      let values = decodeURIComponent(valuesStr).split(',')
      console.log('seturl', values)
      if (name === 'ingredients') {
        setIngredients(values)
      } else if (name === 'seasonings') {
        setSeasonings(values)
      }
    }
  }
}