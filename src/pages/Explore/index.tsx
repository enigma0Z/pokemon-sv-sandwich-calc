import { Autocomplete, Box, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import IngredientDetail from '../../components/IngredientDetail'
import { Ingredients, Seasonings, PokemonTypes, MealPowers, Tastes } from '../../data/Cookbooks'
import { Ingredient } from '../../data/Cookbook'
import { NitroPayConfig } from '../../util/NitroPayConfig'

export default function Explore() {
  useEffect(() => {
    document.title = "Sandwich Calculator: Explore"
  }, [])

  const [filter, setFilter] = useState<string[]>([])

  const isVisible = (ingredient: Ingredient): boolean => {
    if (filter.length === 0) {
      return true
    } else {
      for (let f of filter) {
        const inTaste = f in ingredient.taste
        const inPower = f in ingredient.power
        const inType = f in ingredient.type

        if (!inTaste && !inPower && !inType) {
          return false
        }
      }
      return true
    }
  }

  useEffect(() => {
    
    //@ts-ignore
    window['nitroAds'].createAd('explore-mid-content-dynamic-1', {
      ...NitroPayConfig,
      "renderVisibleOnly": true,
      "refreshVisibleOnly": true,
      "delayLoading": true,
      "report": {
        "enabled": true,
        "icon": true,
        "wording": "Report Ad",
        "position": "bottom-right"
      }
    });

    //@ts-ignore
    window['nitroAds'].createAd('explore-mid-content-dynamic-2', {
      ...NitroPayConfig,
      "renderVisibleOnly": true,
      "refreshVisibleOnly": true,
      "delayLoading": true,
      "report": {
        "enabled": true,
        "icon": true,
        "wording": "Report Ad",
        "position": "bottom-right"
      }
    });
  }, [])

  return (
    <>
      <Box display='flex' flexDirection='row'>
        <Autocomplete 
          multiple
          filterSelectedOptions
          autoHighlight
          autoSelect
          fullWidth
          size="small"
          options={[...Tastes, ...MealPowers, ...PokemonTypes]} 
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter Ingredients"
              placeholder=""
            />
          )}
          onChange={(event, value) => {
            setFilter(value)
          }}
        />
      </Box>
      <Box className="section">
        <h2>Ingredients</h2>
      </Box>
      <Box display='flex' flexDirection={'row'} flexWrap='wrap'>
        {Ingredients.map(x => 
          <IngredientDetail visible={isVisible(x)} kind="ingredient" name={x.name} />
        )}
      </Box>
      <Box id='explore-mid-content-dynamic-1' />
      <Box className="section">
        <h2>Seasonings</h2>
      </Box>
      <Box display='flex' flexDirection={'row'} flexWrap='wrap'>
        {Seasonings.map(x => 
          <IngredientDetail visible={isVisible(x)} kind="seasoning" name={x.name} />
        )}
      </Box>
      <Box id='explore-mid-content-dynamic-2' />
    </>
  )
}