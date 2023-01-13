import { Box, Chip, Link, Theme, Tooltip, useTheme } from '@mui/material';
import IngredientElement from './Ingredient';
import SeasoningElement from './Seasoning';
import './Sandwich.css'
import { MealPower, Recipe } from '../data/Cookbook';
import StatBubbles from './StatBubbles';
import { powerName } from '../data/calc';
import { Sandwich as SandwichType } from '../data/Cookbook';
import { Warning } from '@mui/icons-material';

export function sandwichUri(sandwich: SandwichType) {
  return `/?ingredients=${sandwich.ingredients.map(x => `${x.name}:${x.numPieces}`).join(',')}&seasonings=${sandwich.seasonings.map(x => x.name).join(',')}`
}

export function recipeUri(recipe: Recipe) {
  return `/?ingredients=${recipe.ingredients.join(',')}&seasonings=${recipe.seasonings.join(',')}`
}

export default function Sandwich(props: { 
  sandwich: SandwichType, 
  showDetails?: boolean 
}) {
  const theme = useTheme()
  const styles = (theme: Theme) => ({
    Sandwich: {
      display: 'inline',
      flexDirection: 'column',
      padding: '.5em',
      backgroundColor: '#FFFFC0',
      borderRadius: '16px',
      border: 'solid 4px black',
      width: '30em',
      [theme.breakpoints.down('md')]: {
        width: 'auto'
      }
    },
    SandwichLink: {
      textDecoration: 'none',
      color: '#000000',
      fontFamily: 'monospace'
    },
    SandwichTitle: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '.5em',
      border: 'solid 1px black',
      fontFamily: 'futura',
      fontSize: '13pt',
      fontWeight: 'bold',
    },
    DetailBox: {
      marginTop: '.25em',
      fontSize: '8pt',
      display: 'flex',
      flexDirection: 'column'
    },
    DetailRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    DetailItem: {
      margin: '.1em',
      paddingLeft: '.5em',
      paddingRight: '.5em',
      paddingTop: '.2em',
      paddingBottom: '.2em',
      backgroundColor: 'black',
      borderRadius: '.5em',
      border: 'solid 1px darkgrey',
      color: 'white',
      fontFamily: 'sans-serif'
    }
  })

  const classes = styles(theme)

  const ingredients = props.sandwich.ingredients.map((x) => <IngredientElement name={x.name} />)
  const seasonings = props.sandwich.seasonings.map((x) => <SeasoningElement name={x.name} />)
  const powers = props.sandwich.powers.map((x) => {
    return (<Box>{powerName(x)}</Box>)
  })

  if (props.sandwich.stats !== undefined) {
    <Box sx={classes.DetailBox}>
      <Box>Taste</Box>
      <Box sx={classes.DetailRow}>
        {Object.keys(props.sandwich.stats.taste).map(key => {
          if (props.sandwich.stats?.taste[key] === 0) {
            return null
          } else {
            return <Box sx={classes.DetailItem}>{key}: {props.sandwich.stats?.taste[key]}</Box>
          }
        })}
      </Box>
      <Box>Power</Box>
      <Box sx={classes.DetailRow}>
        {Object.keys(props.sandwich.stats.power).map(key => {
          if (props.sandwich.stats?.power[key as MealPower] === 0) {
            return null
          } else {
            return <Box sx={classes.DetailItem}>{key}: {props.sandwich.stats?.power[key as MealPower]}</Box>
          }
        })}
      </Box>
      <Box>Type</Box>
      <Box sx={classes.DetailRow}>
        {Object.keys(props.sandwich.stats.type).map(key => {
          if (props.sandwich.stats?.type[key] === 0) {
            return null
          } else {
            return <Box sx={classes.DetailItem}>{key}: {props.sandwich.stats?.type[key]}</Box>
          }
        })}
      </Box>
    </Box>
  }


  const description = <Box><p>{props.sandwich.description ? props.sandwich.description : ''}</p></Box>

  return (
    <Tooltip title={
      <>
        <p>Ingredients: {props.sandwich.ingredients.map(x => x.name).join(', ')}</p>
        <p>Seasonings: {props.sandwich.seasonings.map(x => x.name).join(', ')}</p>
      </>}>
      <Box sx={classes.Sandwich}>
        <Link href={sandwichUri(props.sandwich)} sx={classes.SandwichLink}>
          <Box sx={classes.SandwichTitle} display={"flex"} flexDirection={"row"}>
            {props.sandwich.number ? `#${props.sandwich.number}` : ''} {props.sandwich.name || 'A Tasty Original'}
          </Box>
          {description}
          <Box display={"flex"} flexDirection={"column"}> {powers} </Box>
          <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}> {ingredients} </Box>
          <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}> {seasonings} </Box>
          <Box display={props.sandwich.stats !== undefined && props.showDetails ? "flex" : "none"} flexDirection={"row"}>
            <StatBubbles taste={props.sandwich.stats?.taste} power={props.sandwich.stats?.power} type={props.sandwich.stats?.type} />
          </Box>
          {props.sandwich.warning ? <Chip color='error' icon={<Warning/>} label='This sandwich may fail'/> : '' }
        </Link>
      </Box>
    </Tooltip>
  )
}