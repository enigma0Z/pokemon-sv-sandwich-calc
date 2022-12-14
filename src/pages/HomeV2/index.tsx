import './index.css';
import { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, SelectChangeEvent, Theme, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import { Ingredients, Seasonings } from '../../data/Cookbooks';
import { Ingredient } from '../../data/Cookbook';
import { calculateSandwich } from '../../data/calc';
import Sandwich from '../../components/SandwichV2';
import { useLocation, useOutletContext } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import StatBubbles from '../../components/StatBubbles';

const INGREDIENTS_PER_PLAYER = 6
const SEASONINGS_PER_PLAYER = 4

export default function HomeV2() {

  const [setSearch] = useOutletContext<[(v: string) => {}]>();

  useEffect(() => {
    document.title = "Sandwich Calculator: Home"
  }, [])

  const location = useLocation()
  const theme = useTheme()
  const styles = (theme: Theme) => ({
    IngredientSelect: {
      display: 'flex',
      flexDirection: 'column',
      width: '15em',
      margin: '.25em',
      [theme.breakpoints.down('md')]: {
        flexBasis: '47%',
      }
    },
    DetailBox: {
      marginTop: '.25em',
      fontSize: '8pt',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column'
    },
    DetailRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    DetailItem: {
      margin: '.25em',
      paddingLeft: '.5em',
      paddingRight: '.5em',
      paddingTop: '.1em',
      paddingBottom: '.1em',
      backgroundColor: 'black',
      borderRadius: '.5em',
      border: 'solid 1px darkgrey'
    }
  })

  const classes = styles(theme)

  let uriIngredients: string[] = []
  let uriSeasonings: string[] = []
  let uriPlayers = 1

  const QueryString = location.search.slice(1)
  for (let entry of QueryString.split('&')) {
    let [name, valuesStr] = entry.split('=')
    let values = decodeURIComponent(valuesStr).split(',')
    if (name === 'ingredients') {
      for (let value of values) {
        let foundIngredient = Ingredients.find(ingredient => ingredient.name.toLowerCase() === value.toLowerCase())
        if (foundIngredient !== undefined) {
          uriIngredients.push(foundIngredient.name)
        } else {
          uriIngredients.push('')
        }
      }
    } else if (name === 'seasonings') {
      for (let value of values) {
        let foundSeasoning = Seasonings.find(seasoning => seasoning.name.toLowerCase() === value.toLowerCase())
        if (foundSeasoning !== undefined) {
          uriSeasonings.push(foundSeasoning.name)
        } else {
          uriSeasonings.push('')
        }
      }
    } else if (name === 'players') {
      uriPlayers = parseInt(values[0])
    }
  }

  const [ingredients, setIngredients]: [string[], any] = useState(uriIngredients)
  const [seasonings, setSeasonings]: [string[], any] = useState(uriSeasonings)

  const [showDetails, setShowDetails] = useState(false)
  const [players, setPlayers] = useState(uriPlayers)

  const actualIngredients: Ingredient[] = []
  for (let ingredient of ingredients) {
    const foundIngredient = Ingredients.find(x => x.name === ingredient)
    if (ingredient !== null && foundIngredient !== undefined) actualIngredients.push(foundIngredient)
  }

  const actualSeasonings: Ingredient[] = []
  for (let seasoning of seasonings) {
    const foundSeasoning = Seasonings.find(x => x.name === seasoning)
    if (seasoning !== null && foundSeasoning !== undefined) actualSeasonings.push(foundSeasoning)
  }

  const sandwich: JSX.Element[] = []
  if (
    actualIngredients.length > 0 && actualSeasonings.length > 0
  ) {
    sandwich.push(<Sandwich showDetails={showDetails} {...calculateSandwich(actualIngredients, actualSeasonings) }></Sandwich>)
  }

  const setUri = (ingredients: string[], seasonings: string[], players?: number) => {
    const actualIngredients: string[] = []
    for (let ingredient of ingredients) {
      const foundIngredient = Ingredients.find(x => x.name === ingredient)
      if (ingredient !== null && foundIngredient !== undefined) actualIngredients.push(foundIngredient.name)
      else actualIngredients.push('')
    }

    const actualSeasonings: string[] = []
    for (let seasoning of seasonings) {
      const foundSeasoning = Seasonings.find(x => x.name === seasoning)
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
  for (let i = 0; i<INGREDIENTS_PER_PLAYER*players; i++) {
    let ingredient = Ingredients.find(x => x.name === ingredients[i])
    if (
      i % INGREDIENTS_PER_PLAYER === 0
      && i+1 < INGREDIENTS_PER_PLAYER*players
    ) {
      ingredientSelects.push(<Box flexBasis={'100%'}>Player {i / INGREDIENTS_PER_PLAYER + 1}</Box>)
    }
    ingredientSelects.push(
      <Box sx={classes.IngredientSelect} >
        <Select
          native={isMobile}
          key={i + 'select'}
          // sx={classes.IngredientSelect}
          sx={{
            width: '100%'
          }}
          value={ingredients[i] !== undefined ? ingredients[i] : '' }
          onChange={(event: SelectChangeEvent) => {
            const newIngredients = [...ingredients]
            newIngredients[i] = event.target.value
            setIngredients(newIngredients)
            setUri(newIngredients, seasonings, players)
          }}
        >
          {isMobile ? 
            <option key='empty' value={''}></option> :
            <MenuItem key='empty' value={''}>–––</MenuItem>
          }
          {Ingredients.map(ingredient => {
            if (isMobile) {
              return <option key={ingredient.name} value={ingredient.name}>{ingredient.name}</option>
            } else {
              return <MenuItem key={ingredient.name} value={ingredient.name}>{ingredient.name}</MenuItem>
            }
          })}
        </Select>
        <Box 
          key={i + 'detail'}
          display={ingredients[i] !== null && showDetails ? 'flex' : 'none'}
        >
          <StatBubbles taste={ingredient?.taste} power={ingredient?.power} type={ingredient?.type} amount={ingredient?.max} />
        </Box>
      </Box>
    )

  }

  const seasoningSelects: JSX.Element[] = []
  for (let i = 0; i<SEASONINGS_PER_PLAYER*players; i++) {
    if (
      i % SEASONINGS_PER_PLAYER === 0
      && i+1 < SEASONINGS_PER_PLAYER*players
    ) {
      seasoningSelects.push(<Box flexBasis={'100%'}>Player {i / SEASONINGS_PER_PLAYER + 1}</Box>)
    }

    let seasoning = Seasonings.find(x => x.name === seasonings[i])
    seasoningSelects.push(
      <Box sx={classes.IngredientSelect} >
        <Select
          native={isMobile}
          key={i + 'select'}
          sx={{
            width: '100%'
          }}
          value={seasonings[i] !== undefined ? seasonings[i] : '' }
          onChange={(event: SelectChangeEvent) => {
            const newSeasonings = [...seasonings]
            newSeasonings[i] = event.target.value
            setSeasonings(newSeasonings)
            setUri(ingredients, newSeasonings, players)
          }}
        >
          {isMobile ? 
            <option key='empty' value={''}></option> :
            <MenuItem key='empty' value={''}>–––</MenuItem>
          }
          {Seasonings.map(seasoning => {
            if (isMobile) {
              return <option key={seasoning.name} value={seasoning.name}>{seasoning.name}</option>
            } else {
              return <MenuItem key={seasoning.name} value={seasoning.name}>{seasoning.name}</MenuItem>
            }
          })}
        </Select>
        <Box 
          key={i + 'detail'}
          display={seasoning !== undefined && showDetails ? 'flex' : 'none'}
        >
          <StatBubbles taste={seasoning?.taste} power={seasoning?.power} type={seasoning?.type} />
        </Box>
      </Box>
    )

    if (
      (i+1) % SEASONINGS_PER_PLAYER === 0
      && i+1 < SEASONINGS_PER_PLAYER*players
    ) {
      seasoningSelects.push(<Box flexBasis={'100%'}>&nbsp;</Box>)
    }
  }

  return (
    <>
      <Box><h2>Players</h2></Box>
      <Box display='flex' flexDirection='row' flexWrap='wrap'>
        <ToggleButtonGroup value={players} exclusive={true} onChange={(event, value) => {
          setPlayers(value)
          const newIngredients = ingredients.slice(0, INGREDIENTS_PER_PLAYER*value) 
          const newSeasonings = seasonings.slice(0, SEASONINGS_PER_PLAYER*value) 
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