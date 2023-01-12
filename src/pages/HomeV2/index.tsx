import './index.css';
import { useState, useEffect } from 'react';
import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Ingredients, Seasonings } from '../../data/Cookbooks';
import { Ingredient, SandwichPower } from '../../data/Cookbook';
import { calculateSandwich, powerName, powerRequirements } from '../../data/calc';
import Sandwich from '../../components/SandwichV2';
import { useLocation, useOutletContext } from 'react-router-dom';
import PowerSelect from '../../components/PowerSelect';
import PowerRequirementComponent from '../../components/PowerRequirementComponent';
import IngredientSelect from '../../components/IngredientSelect';
import QueryStringProps from '../../util/QueryStringProps';

const INGREDIENTS_PER_PLAYER = 6
const SEASONINGS_PER_PLAYER = 4

const LS_HOME_GUIDE_POWERS = 'home_guide_powers'

export default function HomeV2() {
  const [setSearch] = useOutletContext<[(v: string) => {}]>();

  useEffect(() => {
    document.title = "Sandwich Calculator: Home"
  }, [])

  const location = useLocation()

  let localStorageGuidePowers = localStorage.getItem(LS_HOME_GUIDE_POWERS)
  let loadedGuidePowers: SandwichPower[] = []
  if (localStorageGuidePowers) {
    loadedGuidePowers = JSON.parse(localStorageGuidePowers)
  }

  useEffect(() => {
    const queryStringProps: QueryStringProps = new QueryStringProps(location.search.slice(1))
    setIngredients(queryStringProps.ingredients)
    setSeasonings(queryStringProps.seasonings)
  }, [location])

  const queryStringProps: QueryStringProps = new QueryStringProps(location.search.slice(1))

  console.log(queryStringProps)

  const [guidePowers, setGuidePowers] = useState(loadedGuidePowers)

  const [ingredients, setIngredients]: [(Ingredient | null)[], any] = useState(queryStringProps.ingredients)
  const [seasonings, setSeasonings]: [(Ingredient | null)[], any] = useState(queryStringProps.seasonings)

  const [showDetails, setShowDetails] = useState(false)
  const [players, setPlayers] = useState(queryStringProps.players)

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
    actualIngredients.length > 0 && actualSeasonings.length > 0
  ) {
    calculatedSandwich = calculateSandwich(actualIngredients, actualSeasonings)

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
    sandwich.push(<Sandwich showDetails={showDetails} sandwich={calculatedSandwich}></Sandwich>)
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

    let url
    if (queryString.length > 0) {
      url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${queryString.join('&')}`
      setSearch(`?${queryString.join('&')}`)
    } else {
      url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
      setSearch(``)
    }
    window.history.pushState('', '', url)
  }

  const ingredientSelects: JSX.Element[] = []
  for (let i = 0; i < INGREDIENTS_PER_PLAYER * players; i++) {
    if (
      i % INGREDIENTS_PER_PLAYER === 0
      && i + 1 < INGREDIENTS_PER_PLAYER * players
    ) {
      ingredientSelects.push(<Box flexBasis={'100%'}>Player {i / INGREDIENTS_PER_PLAYER + 1}</Box>)
    }

    ingredientSelects.push(
      <IngredientSelect
        key={i}
        value={ingredients[i]}
        showDetails={showDetails}
        options={Ingredients}
        onChange={(value) => {
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
      seasoningSelects.push(<Box flexBasis={'100%'}>Player {i / SEASONINGS_PER_PLAYER + 1}</Box>)
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
        <ToggleButtonGroup value={players} exclusive={true} onChange={(event, value) => {
          setPlayers(value)
          const newIngredients = ingredients.slice(0, INGREDIENTS_PER_PLAYER * value)
          const newSeasonings = seasonings.slice(0, SEASONINGS_PER_PLAYER * value)
          setIngredients(newIngredients)
          setSeasonings(newSeasonings)
          setUri(newIngredients, newSeasonings, value)
        }}>
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