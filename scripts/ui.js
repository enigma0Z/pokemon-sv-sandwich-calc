import {
  SandwichData, 
  lookupIngredientByName, lookupSeasoningByName, sumComponents, maxComponents,
  sortValueName, addFlavorResult, combineComponents, sortValueType
} from './data.js'

const SandwichUiContainer = document.getElementById('sandwich')

function calculateLevel(level) {
  if (level < 100) {
    return 1
  } else if (level < 2000 ) {
    return 2
  } else {
    return 3
  }
}

function renderResult(result) {
  let monotype = undefined;
  const SortedTaste = Object.keys(result.taste)
    .map( (key) => { return {name: key, value: result.taste[key]} })
    .sort(sortValueName)

  const SortedPower = Object.keys(result.power)
    .map( (key) => { return {name: key, value: result.power[key]} })
    .sort(sortValueName)

  const SortedType = Object.keys(result.type)
    .map( (key) => { return {name: key, value: result.type[key]} })
    .sort(sortValueType)

  // Check sorted type index 1, 2, 3 for values that are different
  // Check for a monotype sandwich
  if (SortedType.length > 4) {
    monotype = SortedType[0].name
    for (let i = 2; i < SortedType.length; i++) {
      if (SortedType[1].value !== SortedType[i].value) monotype = undefined;
    }
  }

  // TODO: Check if type index 1, 2 are the same but 3+ is different is that monotype or reg type
  // TODO: Check if values are added up per type or just per power

  const Ul = document.createElement('ul')
  const Li = [ 
    document.createElement('li'),
    document.createElement('li'),
    document.createElement('li')
  ]
  Ul.appendChild(Li[0])
  Ul.appendChild(Li[1])
  Ul.appendChild(Li[2])

  if (monotype !== undefined) {
    let level = SortedPower[0].value
    level += SortedPower[1].value
    level += SortedPower[2].value
    console.log(`${SortedPower[0].name} Power: ${monotype}, Lv. ${calculateLevel(level)}`)
    Li[0].innerText = `${SortedPower[0].name} Power: ${monotype}, Lv. ${calculateLevel(level)}`
    console.log(`${SortedPower[1].name} Power: ${monotype}, Lv. ${calculateLevel(level)}`)
    Li[1].innerText = `${SortedPower[1].name} Power: ${monotype}, Lv. ${calculateLevel(level)}`
    console.log(`${SortedPower[2].name} Power: ${monotype}, Lv. ${calculateLevel(level)}`)
    Li[2].innerText = `${SortedPower[2].name} Power: ${monotype}, Lv. ${calculateLevel(level)}`
  } else { // TODO: Fix or confirm assumption
    for (let i = 0; i < 3; i++) {
      if (SortedPower[i].name === 'Egg') {
        Li[i].innerText = `Egg Power Lv. ${calculateLevel(SortedPower[i].value)}`
      } else {
        Li[i].innerText = `${SortedPower[i].name} Power: ${SortedType[i].name}, Lv. ${calculateLevel(SortedPower[i].value)}`
      }
    }
  }

  return Ul
}

function renderAttribute(object, quantity, sortingKind = sortValueName) {
  console.log('renderAttribute', object, quantity)
  const Table = document.createElement('table')
  for (let item of Object.keys(object)
    .map( (key) => {return { name: key, value: object[key]}} )
    .sort(sortingKind)
  ) {
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
  console.log('renderAttributes', object)
  const Quantity = object.max !== undefined ? object.max : 1

  const AttributeDiv = document.createElement('div')
  AttributeDiv.setAttribute('class', 'attributes')

  const TasteDiv = document.createElement('div')
  AttributeDiv.appendChild(TasteDiv)

  const TasteLabel = document.createElement('p')
  TasteLabel.innerText = 'Taste'
  TasteDiv.appendChild(TasteLabel)
  TasteDiv.appendChild(renderAttribute(object.taste, Quantity))

  const PowerDiv = document.createElement('div')
  AttributeDiv.appendChild(PowerDiv)

  const PowerLabel = document.createElement('p')
  PowerLabel.innerText = 'Power'
  PowerDiv.appendChild(PowerLabel)
  PowerDiv.appendChild(renderAttribute(object.power, Quantity))

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
function calculateSandwich() {
  const ResultsDiv = document.getElementById('results')

  const ingredients = []
  const seasonings = []

  // Get ingredients from select boxes
  for (let element of document.getElementById('ingredients').getElementsByTagName('select')) {
    if (element.value !== '') {
      ingredients.push(element.value)
    }
  }

  // Get seasonings from select boxes
  for (let element of document.getElementById('seasonings').getElementsByTagName('select')) {
    if (element.value !== '') {
      seasonings.push(element.value)
    }
  }

  const IngredientSum = sumComponents(ingredients, lookupIngredientByName)
  const SeasoningSum = sumComponents(seasonings, lookupSeasoningByName)
  // const FinalResult = sumComponentData([IngredientSum, SeasoningSum])
  const FinalResult = combineComponents(IngredientSum, SeasoningSum)
  const TotalSum = JSON.parse(JSON.stringify(FinalResult))
  addFlavorResult(FinalResult)

  ResultsDiv.innerHTML = ''
  ResultsDiv.appendChild(renderResult(FinalResult))

  console.log(IngredientSum)
  const IngredientDiv = document.createElement('div')
  IngredientDiv.setAttribute('class', 'sum')
  const IngredientTitle = document.createElement('div')
  IngredientTitle.innerText = 'Ingredients Sum'
  IngredientDiv.appendChild(IngredientTitle)
  IngredientDiv.appendChild(renderAttributes(IngredientSum))
  ResultsDiv.appendChild(IngredientDiv)

  console.log(SeasoningSum)
  const SeasoningDiv = document.createElement('div')
  SeasoningDiv.setAttribute('class', 'sum')
  const SeasoningTitle = document.createElement('div')
  SeasoningTitle.innerText = 'Seasonings Sum'
  SeasoningDiv.appendChild(SeasoningTitle)
  SeasoningDiv.appendChild(renderAttributes(SeasoningSum))
  ResultsDiv.appendChild(SeasoningDiv)

  console.log(TotalSum)
  const TotalDiv = document.createElement('div')
  TotalDiv.setAttribute('class', 'sum')
  const TotalTitle = document.createElement('div')
  TotalTitle.innerText = 'Sandwich Total Sum'
  TotalDiv.appendChild(TotalTitle)
  TotalDiv.appendChild(renderAttributes(TotalSum))
  ResultsDiv.appendChild(TotalDiv)

  console.log(FinalResult)
  const FinalResultDiv = document.createElement('div')
  FinalResultDiv.setAttribute('class', 'sum')
  const FinalResultTitle = document.createElement('div')
  FinalResultTitle.innerText = 'Sandwich Final Result (inc. flavor bonus)'
  FinalResultDiv.appendChild(FinalResultTitle)
  FinalResultDiv.appendChild(renderAttributes(FinalResult))
  ResultsDiv.appendChild(FinalResultDiv)

  // console.log(TotalResult)
  // const TotalResultDiv = document.createElement('div')
  // TotalResultDiv.setAttribute('class', 'sum')
  // const TotalResultTitle = document.createElement('div')
  // TotalResultTitle.innerText = 'Sandwich Total Result'
  // TotalResultDiv.appendChild(TotalResultTitle)
  // TotalResultDiv.appendChild(renderAttributes(TotalResult))
  // ResultsDiv.appendChild(TotalResultDiv)
}

// Draw the UI
function renderUi() {
  const IngredientDiv = document.createElement('div')
  IngredientDiv.setAttribute('id', 'ingredients')
  SandwichUiContainer.appendChild(IngredientDiv)

  const IngredientLabel = document.createElement('span')
  IngredientLabel.setAttribute('class', 'label')
  IngredientLabel.innerText = 'Ingredients:'
  IngredientDiv.appendChild(IngredientLabel)

  IngredientDiv.appendChild(ingredientSelect())
  IngredientDiv.appendChild(ingredientSelect())
  IngredientDiv.appendChild(ingredientSelect())
  IngredientDiv.appendChild(ingredientSelect())
  IngredientDiv.appendChild(ingredientSelect())
  IngredientDiv.appendChild(ingredientSelect())

  const SeasoningDiv = document.createElement('div')
  SeasoningDiv.setAttribute('id', 'seasonings')
  SandwichUiContainer.appendChild(SeasoningDiv)

  const SeasoningLabel = document.createElement('span')
  SeasoningLabel.setAttribute('class', 'label')
  SeasoningLabel.innerText = 'Seasonings:'
  SeasoningDiv.appendChild(SeasoningLabel)

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

  const CalculateButton = document.createElement('button')
  CalculateButton.innerText = 'Calculate'
  CalculateButton.onclick = calculateSandwich
  ButtonDiv.appendChild(CalculateButton)
  
  const ResultsDiv = document.createElement('div')
  ResultsDiv.setAttribute('id', 'results')
  SandwichUiContainer.appendChild(ResultsDiv)
}

renderUi()