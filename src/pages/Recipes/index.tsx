import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import Sandwich from '../../components/Sandwich'
import './index.css'

import { PokemonTypes, MealPowers } from '../../data'
import { CustomCookbook, InGameCookbook } from '../../data/Cookbooks'
import { Recipe } from '../../data/Cookbook'

export default function Recipes() {
  const [customSandwiches, setCustomSandwiches] = useState(CustomCookbook.recipes)
  const [inGameSandwiches, setInGameSandwiches] = useState(InGameCookbook.recipes)

  const [filterPower, setFilterPower] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterLevel, setFilterLevel] = useState('')

  const [filterPowerValue, setFilterPowerValue] = useState('')
  const [filterTypeValue, setFilterTypeValue] = useState('')
  const [filterLevelValue, setFilterLevelValue] = useState('')

  const filterSandwiches = (recipes: Recipe[], power?: string, type?: string, level?: string) => { 
    console.log('filterSandwiches', recipes, power, type, level)
    return recipes.filter((recepie) => { 
      if (power === undefined || power === '') {
        return true
      }

      const foundPower = recepie.powers.find(x => x.name === power)
      if (foundPower !== undefined) { // if we found a power
        console.log('Found Power', foundPower)

        // If the found power is not egg (typeless), we specified a type, and the types don't match, skip it
        if (foundPower.name !== 'Egg' && type !== undefined && type !== '' && foundPower.type !== type) { 
          console.log('type mismatch')
          return false
        }

        // At this point either we have egg, type wasn't specified, or type matched
        if (level !== undefined && level !== '' && foundPower.level !== parseInt(level)) {
          console.log('level mismatch')
          return false;
        }
        
        console.log('recipe match')
        return true
      } else {
        return false
      }
    })
  }


  return (
    <Box>
      <Box display='flex' flexDirection='row'>
        <Autocomplete 
          autoHighlight
          id="Power"
          options={MealPowers}
          value={filterPowerValue}
          sx={{ width: '10em', margin: '.5em' }}
          onChange={(event: any, value: string | null) => {
            if (value) {
              setFilterPower(value)
            } else {
              setFilterPower('')
              value = ''
            }

            setCustomSandwiches(filterSandwiches(CustomCookbook.recipes, value, filterType, filterLevel))
            setInGameSandwiches(filterSandwiches(InGameCookbook.recipes, value, filterType, filterLevel))
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
            } else {
              setFilterType('')
              value = ''
            }

            setCustomSandwiches(filterSandwiches(CustomCookbook.recipes, filterPower, value, filterLevel))
            setInGameSandwiches(filterSandwiches(InGameCookbook.recipes, filterPower, value, filterLevel))
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
            } else {
              setFilterLevel('')
              value = ''
            }

            setCustomSandwiches(filterSandwiches(CustomCookbook.recipes, filterPower, filterType, value))
            setInGameSandwiches(filterSandwiches(InGameCookbook.recipes, filterPower, filterType, value))
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

            setCustomSandwiches(CustomCookbook.recipes)
            setInGameSandwiches(InGameCookbook.recipes)
          }}
          variant="outlined"
        >
          Reset
        </Button>
      </Box>
      <Box><h2>Creative Mode Sandwiches</h2></Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {customSandwiches.map((recipe) => <Sandwich {...recipe} />)}
      </Box>
      <Box><h2>In-Game Recipes</h2></Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {inGameSandwiches.map((recipe) => <Sandwich {...recipe} />)}
      </Box>
    </Box>
  )
}