import { Ingredients, MealPowers, PokemonTypes, Seasonings, TastePowerBonus } from '../../data/Cookbooks'
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Research() {
  useEffect(() => {
    document.title = "Sandwich Calculator: Research"
  }, [])

  const i = Ingredients.length
  const s = Seasonings.length

  console.log(i, s, i ** 6 * s ** 4)

  const [filterPower, setFilterPower] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterLevel, setFilterLevel] = useState('')

  console.log(filterPower, filterType, filterLevel)

  let recommendations: JSX.Element[] = []

  if (
    filterPower !== '' && 
    (filterPower === 'Egg' || filterType !== '') &&
    filterLevel !== ''
  ) {
    recommendations.push(<li>{`${filterPower} must be present`}</li>)
    if (filterPower !== 'Egg') {
      recommendations.push(<li>{`${filterType} must align with ${filterPower} Power. Power 1 aligns with Type 1, but Power 2 goes to Type 3 and Power 3 goes to Type 2. `
      + `For example, for top 3 types Fighting, Flying, and Normal, and top 3 Powers Exp., Raid, and Teensy, you'd get Exp raid, Teensy Flying, and Normal Raid`}</li>)
    }

    if (parseInt(filterLevel) > 1) {
      recommendations.push(<li>{`Taste bonus (${TastePowerBonus.find(tpb => tpb.power === filterPower)?.taste.join(' & ')} for ${filterPower} is recommended to get ${filterPower} higher`}</li>)
    }

    if (parseInt(filterLevel) === 2) {
      console.log(`${filterPower} must be > 100 ${filterType !== '' ? ` and ${filterType} must be > 180` : ''}`)
    } else { // level === 3
      console.log(`${filterPower} must be > 1000 and ${filterType} must be > 180`)
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

            console.log(`${filterPower} must be present`)
            if (filterPower !== 'Egg') {
              console.log(`${filterType} must align with ${filterPower} Power. Power 1 aligns with Type 1, but Power 2 goes to Type 3 and Power 3 goes to Type 2`)
              console.log(`For example, for top 3 types Fighting, Flying, and Normal, and top 3 Powers Exp., Raid, and Teensy, you'd get Exp raid, Teensy Flying, and Normal Raid`)
            }

            if (parseInt(value) > 1) {
              console.log(`Taste bonus (${TastePowerBonus.find(tpb => tpb.power === filterPower)?.taste.join(' & ')} for ${filterPower} is recommended to get ${filterPower} higher`)
            }

            if (parseInt(value) === 2) {
              console.log(`${filterPower} must be > 100 ${filterType !== '' ? ` and ${filterType} must be > 180` : ''}`)
            } else { // level === 3
              console.log(`${filterPower} must be > 1000 and ${filterType} must be > 180`)
            }

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
          }}
        >
          Reset
        </Button>
      </Box>
    </>
  )
}