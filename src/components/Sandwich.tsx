import { Box, Tooltip } from '@mui/material';
import { SandwichPower } from '../data/Cookbook';
import { powerName } from '../data/calc';
import IngredientImage from './widgets/Ingredient/Image';
import { DomLink } from './DomLink';

export default function Sandwich(props: { 
  name?: string; 
  description?: string;
  location?: string;
  number?: number;
  ingredients: string[]; 
  seasonings: string[]; 
  powers: SandwichPower[];
}) {
  const ingredients = props.ingredients.map((x) => <IngredientImage key={x} kind='ingredient' name={x.split(':')[0]} />)
  const seasonings = props.seasonings.map((x) => <IngredientImage key={x} kind='seasoning' name={x.split(':')[0]} />)
  const powers = props.powers.map((x) => { 
    return (
      <Box key={x.toString()}>
        {powerName(x)}
      </Box>) 
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
        <DomLink href={uri} onClick={() => {
          //@ts-ignore
          gtag('event', 'sandwich_click', {uri: uri})
        }}>
          <Box className='title' display={"flex"} flexDirection={"row"}>
            <h3>{props.number ? `#${props.number}` : ''} {props.name || 'A Tasty Original'}</h3>
          </Box>
          {description}
          <Box display={"flex"} flexDirection={"column"}> {powers} </Box>
          <Box display={"flex"} flexDirection={"row"}> {ingredients} </Box>
          <Box display={"flex"} flexDirection={"row"}> {seasonings} </Box>
        </DomLink>
      </Box>
    </Tooltip>
  )
}