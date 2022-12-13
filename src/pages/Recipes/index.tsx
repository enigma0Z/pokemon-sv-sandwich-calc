import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import Sandwich from '../../components/Sandwich'
import './index.css'

import { PokemonTypes, MealPowers } from '../../data'
import { CustomCookbook, InGameCookbook } from '../../data/Cookbooks'
import { Recipe } from '../../data/Cookbook'

export default function Recipes() {
  useEffect(() => {
    document.title = "Sandwich Calculator: Recipes"
  }, [])
  const [customSandwiches, setCustomSandwiches] = useState(CustomCookbook.recipes.map((recipe) => { return { visible: true, recipe: recipe, element: <Sandwich {...recipe} /> } }))
  const [inGameSandwiches, setInGameSandwiches] = useState(InGameCookbook.recipes.map((recipe) => { return { visible: true, recipe: recipe, element: <Sandwich {...recipe} /> } }))

  const [filterPower, setFilterPower] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterLevel, setFilterLevel] = useState('')

  const [filterPowerValue, setFilterPowerValue] = useState('')
  const [filterTypeValue, setFilterTypeValue] = useState('')
  const [filterLevelValue, setFilterLevelValue] = useState('')

  const setSandwiches = (power?: string, type?: string, level?: string) => {
    let newCustomState = customSandwiches
    let newInGameState = inGameSandwiches
    filterSandwiches(newCustomState, power, type, level) 
    setCustomSandwiches(newCustomState)
    filterSandwiches(newInGameState, power, type, level) 
    setInGameSandwiches(newInGameState)
  }

  const filterSandwiches = (state: { visible: boolean, recipe: Recipe, element: JSX.Element }[], power?: string, type?: string, level?: string) => { 
    for (let sandwich of state) { 
      sandwich.visible = false // Start off setting everything hidden

      if (power !== undefined && power !== null && power !== '') {
        let foundPower = sandwich.recipe.powers.find(x => x.name === power)
        if (foundPower !== undefined) {
          if (
            foundPower.name === 'Egg' 
            || (type !== undefined && type !== null && type !== '' && type === foundPower.type)
          ) { 
            if (level !== undefined && level !== null && level !== '' && parseInt(level) === foundPower.level) { 
              // Power, type, and level are all specified and match
              sandwich.visible = true
            } else if (level === null || level === undefined || level === '') {
              // Power, type specified, level was not
              sandwich.visible = true
            }
          } else if (type === undefined || type === null || type === '') { 
            // Type was not specified, don't care about level
            sandwich.visible = true
          }
        } 
      } else {
        // Power was not specified, make everything visible
        sandwich.visible = true
      }
    }
  }

  return (
    <>
      <Box display='flex' flexDirection='row' flexWrap={'wrap'}>
        <Autocomplete 
          id="Power"
          autoHighlight
          autoSelect
          options={MealPowers}
          value={filterPowerValue}
          sx={{ width: '10em', margin: '.5em' }}
          onChange={(event: any, value: string | null) => {
            if (value) {
              setFilterPower(value)
              setFilterPowerValue(value)
            } else {
              setFilterPower('')
              setFilterPowerValue('')
              value = ''
            }

            setSandwiches(value, filterType, filterLevel)
          }}
          isOptionEqualToValue={(option, value) => {
            return value === undefined || value === null || value === '' || value === option
          }}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Power" 
            />
          )}
        />

        <Autocomplete
          autoHighlight
          id="Type"
          options={PokemonTypes}
          value={filterTypeValue}
          sx={{ width: '10em', margin: '.5em' }}
          onChange={(event: any, value: string | null) => {
            if (value) {
              setFilterType(value)
              setFilterTypeValue(value)
            } else {
              setFilterType('')
              setFilterTypeValue('')
              value = ''
            }

            setSandwiches(filterPower, value, filterLevel)
          }}
          isOptionEqualToValue={(option, value) => {
            return value === undefined || value === null || value === '' || value === option
          }}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Type" 
            />
          )}
        />

        <Autocomplete
          autoHighlight
          id="Level"
          options={['1', '2', '3']}
          value={filterLevelValue}
          sx={{ width: '10em', margin: '.5em' }}
          onChange={(event: any, value: string | null) => {
            if (value) {
              setFilterLevel(value)
              setFilterLevelValue(value)
            } else {
              setFilterLevel('')
              setFilterLevelValue('')
              value = ''
            }

            setSandwiches(filterPower, filterType, value)
          }}
          isOptionEqualToValue={(option, value) => {
            return value === undefined || value === null || value === '' || value === option
          }}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Level" 
            />
          )}
        />
        <Button 
          onClick={(event: any) => {
            setFilterPower('')
            setFilterType('')
            setFilterLevel('')

            setFilterPowerValue('')
            setFilterTypeValue('')
            setFilterLevelValue('')

            setSandwiches()
          }}
        >
          Reset
        </Button>
      </Box>
      <Box><h2>Creative Mode Sandwiches</h2></Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {/* {customSandwiches.map((recipe) => <Sandwich {...recipe} />)} */}
        {customSandwiches.filter(sandwich => sandwich.visible).map(sandwich => sandwich.element)}
      </Box>
      <Box><h2>In-Game Recipes</h2></Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {/* {inGameSandwiches.map((recipe) => <Sandwich {...recipe} />)} */}
        {inGameSandwiches.filter(sandwich => sandwich.visible).map(sandwich => sandwich.element)}
      </Box>
    </>
  )
}