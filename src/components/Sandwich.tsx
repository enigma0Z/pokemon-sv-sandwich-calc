import { Box, Tooltip } from '@mui/material';
import Ingredient from './Ingredient';
import Seasoning from './Seasoning';
import './Sandwich.css'

export default function sandwich(props: { 
  name?: string; 
  description?: string;
  location?: string;
  number?: number;
  ingredients: string[]; 
  seasonings: string[]; 
  powers: {name: string; type: string | null; level: number}[];
}) {

  const ingredients = props.ingredients.map((x) => <Ingredient name={x} />)
  const seasonings = props.seasonings.map((x) => <Seasoning name={x} />)
  const powers = props.powers.map((x) => { 
    let desc = `${x.name} Power`
    if (x.name.toLowerCase() !== 'egg') desc += `: ${x.type}`
    desc += `, Lv. ${x.level}`
    return (<Box>{desc}</Box>) 
  })

  const uri = `/?ingredients=${props.ingredients.join(',')}&seasonings=${props.seasonings.join(',')}`

  let description = null
  if (props.description) {
    description = <Box><p>{props.description}</p></Box>
  }

  return (
    <Tooltip title={
      <>
        <p>Ingredients: {props.ingredients.join(', ')}</p>
        <p>Seasonings: {props.seasonings.join(', ')}</p>
      </>}>
      <Box className='sandwich'>
        <a href={uri}>
          <Box className='title' display={"flex"} flexDirection={"row"}>
            <h3>{props.number ? `#${props.number}` : ''} {props.name || 'A Tasty Original (custom sandwich)'}</h3>
          </Box>
          {description}
          <Box display={"flex"} flexDirection={"column"}> {powers} </Box>
          <Box display={"flex"} flexDirection={"row"}> {ingredients} </Box>
          <Box display={"flex"} flexDirection={"row"}> {seasonings} </Box>
        </a>
      </Box>
    </Tooltip>
  )
}