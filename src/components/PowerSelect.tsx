import { CustomCookbook, InGameCookbook, LevelSynonyms, MealPowers, MealPowerSynonyms, PokemonTypes } from '../data/Cookbooks'
import { Autocomplete, Box, Button, Chip, createFilterOptions, TextField } from '@mui/material'
import { Link as DomLink } from 'react-router-dom'
import { useState } from 'react'
import { powerName } from '../data/calc'
import { SandwichPower } from '../data/Cookbook'
import { recipeUri, sandwichUri } from './SandwichV2'
import { LunchDining } from '@mui/icons-material'

export default function PowerSelect(
  props: {
    visible?: boolean,
    onChange?: (value: SandwichPower[]) => void,
    powers?: SandwichPower[],
    showRecipes?: boolean
  }
) {
  const [powers, setPowers] = useState<SandwichPower[]>(props.powers ? props.powers : [])

  const options: SandwichPower[] = []

  const filterOptions = createFilterOptions({
    stringify: (option: SandwichPower) => {
      const tokens: (string | number)[] = []
      tokens.push(powerName(option))
      tokens.push(option.name)
      if (option.type) tokens.push(option.type)
      tokens.push(option.level)

      for (let powerSyn of MealPowerSynonyms[option.name]) {
        tokens.push(powerSyn)
        if (option.type) tokens.push(option.type)
        tokens.push(option.level)

        for (let levelSyn of LevelSynonyms[option.level]) {
          tokens.push(powerSyn)
          if (option.type) tokens.push(option.type)
          tokens.push(levelSyn)
        }
      }

      for (let levelSyn of LevelSynonyms[option.level]) {
        tokens.push(option.name)
        if (option.type) tokens.push(option.type)
        tokens.push(levelSyn)
      }
      return tokens.join(' ')
    }
  })

  for (let power of MealPowers) {
    if (power !== 'Egg') {
      for (let type of PokemonTypes) {
        for (let level of [1, 2, 3]) {
          options.push({
            name: power,
            type: type,
            level: level
          })
        }
      }
    } else {
      for (let level of [1, 2, 3]) {
        options.push({
          name: power,
          type: null,
          level: level
        })
      }
    }
  }

  let visible = props.visible
  if (visible === undefined) visible = true

  const foundRecipes: JSX.Element[] = []
  let workingRecipes = [...InGameCookbook.recipes, ...CustomCookbook.recipes]

  if (props.showRecipes) {
    if (powers.length > 0) {
      for (let power of powers) {
        workingRecipes = workingRecipes.filter(recipe => {
          return recipe.powers.map(recipePower => (
            power.name === recipePower.name
            && power.level === recipePower.level
            && (power.name === 'Egg' || power.type === recipePower.type)
          )).includes(true)
        })
      }

      for (let recipe of workingRecipes) {
        foundRecipes.push(<Chip 
          clickable
          component={DomLink}
          size={'small'} 
          sx={{ margin: '.25em' }} 
          label={recipe.name} 
          to={recipeUri(recipe)}
          icon={<LunchDining />}
          // onClick={() => {
          //   const url = `${window.location.protocol}//${window.location.host}${recipeUri(recipe)}`
          //   window.history.pushState('', '', url)
          // }}
        />)
      }
    }
  }

  return (
    <Box display={visible ? 'flex' : 'none'} flexDirection='column' sx={{ width: '100%' }}>

      <Box display={'flex'} flexDirection='row' flexWrap={'wrap'} sx={{ width: '100%' }}>
        <Autocomplete
          id='Power'
          autoHighlight
          multiple
          fullWidth
          options={options}
          value={powers}
          filterOptions={filterOptions}
          getOptionLabel={(option) => powerName(option)}
          isOptionEqualToValue={(option, value) => option.name === value.name && option.type === value.type && option.level === value.level}
          getOptionDisabled={(option) => {
            return powers.length === 3 || powers.map(power => power.name).includes(option.name)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Sandwich Powers"
            />
          )}
          onChange={(event, value) => {
            setPowers(value)
            if (props.onChange) props.onChange(value)
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection='row' flexWrap={'wrap'} alignItems='center'>
        <Button
          onClick={(event: any) => {
            setPowers([])

            if (props.onChange) props.onChange([])
          }}
        >
          Reset
        </Button>
      </Box>
      <Box display={'flex'} flexDirection='row' flexWrap={'wrap'} alignItems='center'>
        {foundRecipes}
      </Box>
    </Box>
  )
}