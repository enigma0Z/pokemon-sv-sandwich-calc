import { MealPowers, PokemonTypes } from '../data/Cookbooks'
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { useState } from 'react'

export default function PowerSelect(
  props: {
    visible?: boolean,
    onChange?: (power: string | null, type: string | null, level: number | null) => void
    power?: string,
    type?: string,
    level?: string
  }
) {
  const [filterPower, setFilterPower] = useState(props.power ? props.power : '')
  const [filterType, setFilterType] = useState(props.type ? props.type : '')
  const [filterLevel, setFilterLevel] = useState(props.level ? props.level : '')

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
          } else {
            setFilterPower('')
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

          if (props.onChange) props.onChange(null, null, null)
        }}
      >
        Reset
      </Button>
    </Box>
  )
}