import { useState, useEffect } from 'react';
import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Ingredients, Seasonings } from '../data/Cookbooks';
import { Ingredient, SandwichPower } from '../data/Cookbook';
import { calculateSandwich, powerName, powerRequirements } from '../data/calc';
import Sandwich, { ingredientsUri } from '../components/SandwichV2';
import PowerSelect from '../components/PowerSelect';
import PowerRequirementComponent from '../components/PowerRequirementComponent';
import QueryStringProps from '../util/QueryStringProps';
import IngredientSelect from '@/components/widgets/Ingredient/IngredientSelect';

const INGREDIENTS_PER_PLAYER = 6
const SEASONINGS_PER_PLAYER = 4

const LS_HOME_GUIDE_POWERS = 'home_guide_powers'
const LS_HOME_STATE_QUERY_STRING = 'home_state_qs'

export default function Home() {
  useEffect(() => {
    let localStorageGuidePowers = window.localStorage.getItem(LS_HOME_GUIDE_POWERS)
    let loadedGuidePowers: SandwichPower[] = []
    if (localStorageGuidePowers) {
      loadedGuidePowers = JSON.parse(localStorageGuidePowers)
      console.log('loaded guide powers', loadedGuidePowers)
      setGuidePowers(loadedGuidePowers)
    }
    if (window.location.search.slice(1).length > 0) {
      console.log('home qs parse')
      const queryStringProps: QueryStringProps = new QueryStringProps(window.location.search.slice(1))
      setIngredients(queryStringProps.ingredients)
      setSeasonings(queryStringProps.seasonings)
      setPlayers(queryStringProps.players)
      window.localStorage.setItem(LS_HOME_STATE_QUERY_STRING, ingredientsUri(queryStringProps.ingredients, queryStringProps.seasonings))
    } else {
      console.log('home local storage parse')
      let localStorageQueryString = window.localStorage.getItem(LS_HOME_STATE_QUERY_STRING)
      if (localStorageQueryString) {
        const queryStringProps: QueryStringProps = new QueryStringProps(localStorageQueryString)
        console.log('home local storage parse', localStorageQueryString, queryStringProps)
        console.log(setIngredients(queryStringProps.ingredients))
        console.log(setSeasonings(queryStringProps.seasonings))
        console.log(setPlayers(queryStringProps.players) )
        setUri(queryStringProps.ingredients, queryStringProps.seasonings)
      }
    }

    document.title = "Sandwich Calculator: Home"
  }, [])

  const [guidePowers, setGuidePowers]: [SandwichPower[], (powers: SandwichPower[]) => void] = useState([] as SandwichPower[])

  const [ingredients, setIngredients]: [(Ingredient | null)[], any] = useState([])
  const [seasonings, setSeasonings]: [(Ingredient | null)[], any] = useState([])

  const [showDetails, setShowDetails] = useState(false)
  const [players, setPlayers] = useState(1)

  const actualIngredients: (Ingredient | undefined)[] = []
  for (let ingredient of ingredients) {
    const foundIngredient = Ingredients.find(x => x.name === ingredient?.name)
    actualIngredients.push(foundIngredient)
  }

  const actualSeasonings: (Ingredient | undefined)[] = []
  for (let seasoning of seasonings) {
    const foundSeasoning = Seasonings.find(x => x.name === seasoning?.name)
    actualSeasonings.push(foundSeasoning)
  }

  let calculatedSandwich
  if (
    ingredients.filter(x => x !== null && x !== undefined).length > 0
    && seasonings.filter(x => x !== null && x !== undefined).length > 0
  ) {
    console.log('Calculating sandwich', ingredients, seasonings)
    calculatedSandwich = calculateSandwich(ingredients.map(x => x === null ? undefined : x), seasonings)

    //@ts-ignore
    gtag('event', 'home_sandwich_create', {
      ingredients: calculatedSandwich.ingredients.map(x => x.name),
      seasonings: calculatedSandwich.seasonings.map(x => x.name),
      powers: calculatedSandwich.powers.map(x => powerName(x))
    })
  }

  const sandwich: JSX.Element[] = []
  if (
    calculatedSandwich
  ) {
    sandwich.push(<Sandwich key='sandwich' showDetails={showDetails} sandwich={calculatedSandwich}></Sandwich>)
  }

  const setUri = (ingredients: (Ingredient | null)[], seasonings: (Ingredient | null)[], players?: number) => {
    const actualIngredients: string[] = []
    for (let ingredient of ingredients) {
      const foundIngredient = Ingredients.find(x => x.name === ingredient?.name)
      if (ingredient !== null && foundIngredient !== undefined) actualIngredients.push(foundIngredient.name)
      else actualIngredients.push('')
    }

    const actualSeasonings: string[] = []
    for (let seasoning of seasonings) {
      const foundSeasoning = Seasonings.find(x => x.name === seasoning?.name)
      if (seasoning !== null && foundSeasoning !== undefined) actualSeasonings.push(foundSeasoning.name)
      else actualSeasonings.push('')
    }

    let queryString = []
    if (actualIngredients.length > 0) {
      queryString.push(`ingredients=${actualIngredients.join(',')}`)
    }
    if (actualSeasonings.length > 0) {
      queryString.push(`seasonings=${actualSeasonings.join(',')}`)
    }

    if (players !== undefined) {
      queryString.push(`players=${players}`)
    }

    const qs = ingredientsUri(ingredients, seasonings)
    const url = `${window.location.protocol}//${window.location.host}${qs}`
    localStorage.setItem(LS_HOME_STATE_QUERY_STRING, qs)
    window.history.pushState('', '', url)
  }

  const ingredientSelects: JSX.Element[] = []
  for (let i = 0; i < INGREDIENTS_PER_PLAYER * players; i++) {
    if (
      i % INGREDIENTS_PER_PLAYER === 0
      && i + 1 < INGREDIENTS_PER_PLAYER * players
    ) {
      ingredientSelects.push(<Box key='Ingredients' flexBasis={'100%'}>Player {i / INGREDIENTS_PER_PLAYER + 1}</Box>)
    }

    ingredientSelects.push(
      <IngredientSelect
        key={i}
        value={ingredients[i]}
        showDetails={showDetails}
        options={Ingredients}
        onChange={(value) => {
          console.log('Ingredient onChange()', value)
          const newIngredients = [...ingredients]
          newIngredients[i] = value
          setIngredients(newIngredients)
          setUri(newIngredients, seasonings, players)
        }}
      />
    )
  }

  const seasoningSelects: JSX.Element[] = []
  for (let i = 0; i < SEASONINGS_PER_PLAYER * players; i++) {
    if (
      i % SEASONINGS_PER_PLAYER === 0
      && i + 1 < SEASONINGS_PER_PLAYER * players
    ) {
      seasoningSelects.push(<Box key='Seasonings' flexBasis={'100%'}>Player {i / SEASONINGS_PER_PLAYER + 1}</Box>)
    }

    seasoningSelects.push(
      <IngredientSelect
        key={i}
        value={seasonings[i]}
        showDetails={showDetails}
        options={Seasonings}
        onChange={(value) => {
          const newSeasonings = [...seasonings]
          newSeasonings[i] = value
          setSeasonings(newSeasonings)
          setUri(ingredients, newSeasonings, players)
        }}
      />
    )
  }

  let GuideElement: JSX.Element[] = []
  if (guidePowers.length > 0) {
    GuideElement.push(
      <PowerRequirementComponent
        key={guidePowers.toString()}
        requirements={powerRequirements(
          guidePowers,
          calculatedSandwich
        )}
      />
    )
  }

  return (
    <>
      <Box>
        <h2>Power Guide</h2>
      </Box>
      <Box display='flex' flexDirection='row' flexWrap='wrap'>
        <PowerSelect
          powers={guidePowers}
          onChange={(value) => {
            setGuidePowers([...value])
            localStorage.setItem(LS_HOME_GUIDE_POWERS, value.length > 0 ? JSON.stringify(value) : '')
          }}
          showRecipes={true}
        />
        {GuideElement}
      </Box>
      <Box><h2>Players</h2></Box>
      <Box display='flex' flexDirection='row' flexWrap='wrap'>
        <ToggleButtonGroup
          value={players}
          exclusive={true}
          onChange={(event, value) => {
            setPlayers(value)
            const newIngredients = ingredients.slice(0, INGREDIENTS_PER_PLAYER * value)
            const newSeasonings = seasonings.slice(0, SEASONINGS_PER_PLAYER * value)
            setIngredients(newIngredients)
            setSeasonings(newSeasonings)
            setUri(newIngredients, newSeasonings, value)
          }}
        >
          <ToggleButton value={1} key={1}>1</ToggleButton>
          <ToggleButton value={2} key={2}>2</ToggleButton>
          <ToggleButton value={3} key={3}>3</ToggleButton>
          <ToggleButton value={4} key={4}>4</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box><h2>Ingredients</h2></Box>
      <Box display='flex' flexDirection='row' flexWrap='wrap'>
        {ingredientSelects}
      </Box>
      <Box><h2>Seasonings</h2></Box>
      <Box display='flex' flexDirection='row' flexWrap='wrap'>
        {seasoningSelects}
      </Box>
      <Box display='flex' flexDirection='row' flexWrap='wrap'>
        <Button
          onClick={() => {
            setIngredients([])
            setSeasonings([])
            setUri([], [])
          }}
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            setShowDetails(!showDetails)
          }}
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </Button>
      </Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {sandwich}
      </Box>
    </>
  );
}