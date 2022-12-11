import './index.css';
import { useState, useEffect } from 'react';
import { Box, Button, MenuItem, Select, SelectChangeEvent, Theme, useTheme } from '@mui/material';
import { Ingredients, Seasonings } from '../../data/Cookbooks';
import { Ingredient } from '../../data/Cookbook';
import { calculateSandwich } from '../../data/calc';
import Sandwich from '../../components/SandwichV2';
import { useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const INGREDIENTS_PER_PLAYER = 6
const SEASONINGS_PER_PLAYER = 4

export default function HomeV2() {

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

  const QueryString = location.search.slice(1)
  for (let entry of QueryString.split('&')) {
    let [name, valuesStr] = entry.split('=')
    let values = decodeURIComponent(valuesStr).split(',')
    if (name === 'ingredients') {
      for (let value of values) {
        let foundIngredient = Ingredients.find(ingredient => ingredient.name.toLowerCase() === value.toLowerCase())
        if (foundIngredient !== undefined) {
          uriIngredients.push(foundIngredient.name)
        }
      }
    } else if (name === 'seasonings') {
      for (let value of values) {
        let foundSeasoning = Seasonings.find(seasoning => seasoning.name.toLowerCase() === value.toLowerCase())
        if (foundSeasoning !== undefined) {
          uriSeasonings.push(foundSeasoning.name)
        }
      }
    }
  }

  const [ingredients, setIngredients]: [string[], any] = useState(uriIngredients)
  const [seasonings, setSeasonings]: [string[], any] = useState(uriSeasonings)

  const [showDetails, setShowDetails] = useState(false)
  const [players, setPlayers] = useState(1)

  console.log(setPlayers) // Make typescript linter happy

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

  const renderDetails = (ingredient: Ingredient | undefined) => {
    if (ingredient === undefined) return null
    return (
      <Box sx={classes.DetailBox}>
        <Box>Taste</Box>
        <Box sx={classes.DetailRow}>
          {Object.keys(ingredient.taste).map(key => {
            return <Box sx={classes.DetailItem}>{key}: {ingredient.taste[key]}</Box>
          })}
        </Box>
        <Box>Power</Box>
        <Box sx={classes.DetailRow}>
          {Object.keys(ingredient.power).map(key => {
            return <Box sx={classes.DetailItem}>{key}: {ingredient.power[key]}</Box>
          })}
        </Box>
        <Box>Type</Box>
        <Box sx={classes.DetailRow}>
          {Object.keys(ingredient.type).map(key => {
            return <Box sx={classes.DetailItem}>{key}: {ingredient.type[key]}</Box>
          })}
        </Box>
      </Box>
    )
  }

  const setUri = (ingredients: string[], seasonings: string[]) => {
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

    let queryString = []
    if (actualIngredients.length > 0) {
      queryString.push(`ingredients=${actualIngredients.map(x => x.name).join(',')}`)
    }
    if (actualSeasonings.length > 0) {
      queryString.push(`seasonings=${actualSeasonings.map(x => x.name).join(',')}`)
    }

    let url
    if (queryString.length > 0) {
      url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${queryString.join('&')}`
    } else {
      url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
    }
    window.history.replaceState('', '', url)
  }

  const ingredientSelects: JSX.Element[] = []
  for (let i = 0; i<INGREDIENTS_PER_PLAYER*players; i++) {
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
            setUri(newIngredients, seasonings)
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
          {renderDetails(Ingredients.find(x => x.name ===ingredients[i]))}
        </Box>
      </Box>
    )
  }

  const seasoningSelects: JSX.Element[] = []
  for (let i = 0; i<SEASONINGS_PER_PLAYER*players; i++) {
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
            setUri(ingredients, newSeasonings)
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
          display={seasonings[i] !== null && showDetails ? 'flex' : 'none'}
        >
          {renderDetails(Seasonings.find(x => x.name === seasonings[i]))}
        </Box>
      </Box>
    )
  }

  return (
    <>
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