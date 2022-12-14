import { Box, MenuItem, Select, SelectChangeEvent, Theme, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Ingredient } from '../data/Cookbook';
import StatBubbles from './StatBubbles';

export default function IngredientSelect(props: {
  options: Ingredient[],
  showDetails?: boolean,
  value?: Ingredient | null,
  onChange?: (value: Ingredient | null) => void
}) {

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
  })

  useEffect(() => {
    setValue(props.value ? props.value : null)
  }, [props.value])

  const classes = styles(theme)
  const showDetails = props.showDetails === true
  const [value, setValue] = useState<Ingredient | null>(props.value ? props.value : null)

  return (
    <Box sx={classes.IngredientSelect} >
      <Select
        native={isMobile}
        sx={{ width: '100%' }}
        value={value ? value.name : ''}
        onChange={(event: SelectChangeEvent) => {
          const selectedIngredient = props.options.find(option => option.name === event.target.value)
          if (selectedIngredient) {
            let appliedIngredient = { ...selectedIngredient }
            appliedIngredient.numPieces = appliedIngredient.maxPieces
            setValue(appliedIngredient)
            if (props.onChange) props.onChange(appliedIngredient)
          } else {
            setValue(null)
            if (props.onChange) props.onChange(null)
          }
        }}
      >
        {isMobile ?
          <option key='empty' value={''}></option> : // Mobile needs an `option` object.
          <MenuItem key='empty' value={''}>–––</MenuItem>
        }
        {props.options.map(ingredient => {
          if (isMobile) {
            return <option key={ingredient.name} value={ingredient.name}>{ingredient.name}</option>
          } else {
            return <MenuItem key={ingredient.name} value={ingredient.name}>{ingredient.name}</MenuItem>
          }
        })}
      </Select>
      <Box display={
        value !== null 
        && value !== undefined 
        && value.maxPieces > 1 
        ? 'flex' 
        : 'none'}
      >
        Pieces: {value?.numPieces}
      </Box>
      <Box
        display={value !== null && showDetails ? 'flex' : 'none'}
      >
        <StatBubbles taste={value?.taste} power={value?.power} type={value?.type} amount={value?.maxPieces} />
      </Box>
    </Box>
  );
}