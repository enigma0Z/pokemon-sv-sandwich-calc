import { MealPowers, PokemonTypes } from '../data/Cookbooks'
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { useState } from 'react'

export default function PowerSelect(
  props: {
    visible?: boolean,
    onChange?: (power: string | undefined, type: string | undefined, level: number | undefined) => void
  }
) {
  const [filterPower, setFilterPower] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterLevel, setFilterLevel] = useState('')

  let visible = props.visible
  if (visible === undefined) visible = true

  return (
    <Box display={visible ? 'flex' : 'none'} flexDirection='row' flexWrap={'wrap'}>
      <Autocomplete
        id="Power"
        autoHighlight
        autoSelect
        options={MealPowers}
        value={filterPower}
        sx={{ width: '10em', margin: '.5em' }}
        onChange={(event: any, value: string | null) => {
          if (value) {
            setFilterPower(value)
            // setFilterPowerValue(value)
          } else {
            setFilterPower('')
            // setFilterPowerValue('')
            value = ''
          }
          if (props.onChange) props.onChange(value, filterType, parseInt(filterLevel))
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
        value={filterType}
        sx={{ width: '10em', margin: '.5em' }}
        disabled={(() => filterPower === '' || filterPower === 'Egg')()}
        onChange={(event: any, value: string | null) => {
          if (value) {
            setFilterType(value)
          } else {
            setFilterType('')
            value = ''
          }

          if (props.onChange) props.onChange(filterPower, value, parseInt(filterLevel))
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
        value={filterLevel}
        sx={{ width: '10em', margin: '.5em' }}
        disabled={(() =>
          filterPower === '' || // false
          (filterPower !== '' && filterPower !== 'Egg' && filterType === '')
        )()}
        onChange={(event: any, value: string | null) => {
          if (value) {
            setFilterLevel(value)
          } else {
            setFilterLevel('')
            value = ''
          }

          if (props.onChange) props.onChange(filterPower, filterType, parseInt(value))

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

          if (props.onChange) props.onChange(undefined, undefined, undefined)
        }}
      >
        Reset
      </Button>
    </Box>
  )
}