import { Box } from '@mui/material'
import { useEffect } from 'react'
import IngredientDetail from '../../components/IngredientDetail'
import { Ingredients, Seasonings } from '../../data/Cookbooks'

export default function Explore() {
  useEffect(() => {
    document.title = "Sandwich Calculator: Explore"
  }, [])

  let ingredients = Ingredients.map(x => <IngredientDetail kind='ingredient' key={x.name} name={x.name}/>)
  let seasonings = Seasonings.map(x => <IngredientDetail kind='seasoning' key={x.name} name={x.name}/>)
  return (
    <>
      <Box className="section">
        <h2>Ingredients</h2>
      </Box>
      <Box display='flex' flexDirection={'row'} flexWrap='wrap'>
        {ingredients}
      </Box>
      <Box className="section">
        <h2>Seasonings</h2>
      </Box>
      <Box display='flex' flexDirection={'row'} flexWrap='wrap'>
        {seasonings}
      </Box>
    </>
  )
}