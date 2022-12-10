import { Autocomplete, TextField } from '@mui/material';
import { Seasonings } from '../data/Cookbooks';

export default function SeasoningSelect() {
  return (
    <Autocomplete
      autoHighlight
      options={Seasonings}
      getOptionLabel={option => option.name}
      sx={{ width: '15em', margin: '.5em' }}
      // onChange={(event: any, value: string | null) => { }}
      isOptionEqualToValue={(option, value) => {
        return value === undefined || value === null || value.name === '' || value.name === option.name
      }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label="Seasoning" 
        />
      )}
    />
  );
}