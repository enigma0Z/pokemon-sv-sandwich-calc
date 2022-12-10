import { Autocomplete, Box, TextField } from '@mui/material';
import { Context, useContext, useState } from 'react';
import { Ingredient } from '../data/Cookbook';
import { Ingredients } from '../data/Cookbooks';

export default function IngredientSelect(props: {
  showDetails?: boolean, 
  onChange?: (value: Ingredient |  null) => void
} ) {

  const showDetails = props.showDetails === true
  const [value, setValue] = useState<Ingredient | null>(null)

  return (
    <>
      <Autocomplete
        autoHighlight
        options={Ingredients}
        getOptionLabel={option => option.name}
        sx={{ width: '15em', margin: '.5em' }}
        isOptionEqualToValue={(option, value) => {
          return value === undefined || value === null || value.name === '' || value.name === option.name
        }}
        value={value}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Ingredient" 
          />
        )}
        onChange={(event: any, value: Ingredient | null) => {
          setValue(value)
          if (props.onChange) props.onChange(value)
        }}
      />
      <Box display={showDetails ? 'flex' : 'none'}>

      </Box>
    </>
  );
}