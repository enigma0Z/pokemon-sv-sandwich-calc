import { AddCircle, RemoveCircle, SettingsInputAntennaTwoTone } from '@mui/icons-material';
import { Box, IconButton, MenuItem, Select, SelectChangeEvent, Theme, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { isMobile as isMobileDetect } from 'react-device-detect';
import { Ingredient } from '@/data/Cookbook';
import StatBubbles from '@/components/StatBubbles';

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

  useEffect(() => {
    setIsMobile(isMobileDetect)
  }, [])

  const classes = styles(theme)
  const showDetails = props.showDetails === true
  const [value, setValue] = useState<Ingredient | null>(props.value ? props.value : null)
  const [isMobile, setIsMobile] = useState(false)

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
      <Box
        display={
          value !== null
            && value !== undefined
            && value.maxPieces > 1
            ? 'flex'
            : 'none'}
        sx={{
          alignItems: 'center',
          fontSize: '14pt',
          fontWeight: 300
        }}
      >
        <Box >
          <IconButton
            size={'small'}
            disabled={
              value === null
              || value === undefined
              || value.numPieces === undefined 
              || value.maxPieces === undefined 
              || value.numPieces <= 1
            }
            onClick={() => {
              console.log('minus button')
              if (
                value?.numPieces !== undefined
                && value.numPieces !== 1
              ) {
                value.numPieces -= 1
                setValue({...value})
                if (props.onChange) props.onChange({...value})
              }
            }}
          ><RemoveCircle /></IconButton>
          <IconButton
            size={'small'}
            disabled={
              value === null
              || value === undefined
              || value.numPieces === undefined 
              || value.maxPieces === undefined 
              || value.numPieces >= value.maxPieces
            }
            onClick={() => {
              console.log('add button')
              if (
                value?.numPieces !== undefined
                && value.numPieces < value.maxPieces
              ) {
                value.numPieces += 1
                setValue({...value})
                if (props.onChange) props.onChange({...value})
              }
            }}
          ><AddCircle /></IconButton>
        </Box>
        <Box flexGrow={1} marginLeft={'.5em'}> 
          {value?.numPieces} pieces
        </Box>
      </Box>
      <Box
        display={value !== null && showDetails ? 'flex' : 'none'}
      >
        <StatBubbles taste={value?.taste} power={value?.power} type={value?.type} amount={value?.numPieces ? value?.numPieces : value?.maxPieces } />
      </Box>
    </Box>
  );
}