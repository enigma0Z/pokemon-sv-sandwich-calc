import { Box, Tooltip } from '@mui/material';
import Ingredient from './Ingredient';
import Seasoning from './Seasoning';
import './Sandwich.css'
import { Link } from 'react-router-dom';
import { SandwichPower } from '../data/Cookbook';

export default function Sandwich(props: { 
  name?: string; 
  description?: string;
  location?: string;
  number?: number;
  ingredients: string[]; 
  seasonings: string[]; 
  powers: SandwichPower[];
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
        <Link to={uri} onClick={() => {
          gtag('event', 'sandwich_click', {uri: uri})
        }}>
          <Box className='title' display={"flex"} flexDirection={"row"}>
            <h3>{props.number ? `#${props.number}` : ''} {props.name || 'A Tasty Original'}</h3>
          </Box>
          {description}
          <Box display={"flex"} flexDirection={"column"}> {powers} </Box>
          <Box display={"flex"} flexDirection={"row"}> {ingredients} </Box>
          <Box display={"flex"} flexDirection={"row"}> {seasonings} </Box>
        </Link>
      </Box>
    </Tooltip>
  )
}