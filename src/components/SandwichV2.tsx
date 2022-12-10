import { Box, Theme, Tooltip, useTheme } from '@mui/material';
import IngredientElement from './Ingredient';
import SeasoningElement from './Seasoning';
import './Sandwich.css'
import { Link } from 'react-router-dom';
import { Ingredient, SandwichStats } from '../data/Cookbook';

export default function Sandwich(props: { 
  name?: string; 
  showDetails?: boolean;
  description?: string;
  location?: string;
  number?: number;
  stats?: SandwichStats;
  ingredients: Ingredient[]; 
  seasonings: Ingredient[]; 
  powers: {name: string; type: string | null; level: number}[];
}) {
  const theme = useTheme()
  const styles = (theme: Theme) => ({
    Sandwich: {
      width: '55em',
      [theme.breakpoints.down('md')]: {
        width: 'auto'
      }
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

  const ingredients = props.ingredients.map((x) => <IngredientElement name={x.name} />)
  const seasonings = props.seasonings.map((x) => <SeasoningElement name={x.name} />)
  const powers = props.powers.map((x) => { 
    let desc = `${x.name} Power`
    if (x.name.toLowerCase() !== 'egg') desc += `: ${x.type}`
    desc += `, Lv. ${x.level}`
    return (<Box>{desc}</Box>) 
  })

  let details 
  if (props.stats !== undefined) {
    details = 
      <Box sx={classes.DetailBox}>
        <Box>Taste</Box>
        <Box sx={classes.DetailRow}>
          {Object.keys(props.stats.taste).map(key => {
            if (props.stats?.taste[key] === 0) {
              return null
            } else {
              return <Box sx={classes.DetailItem}>{key}: {props.stats?.taste[key]}</Box>
            }
          })}
        </Box>
        <Box>Power</Box>
        <Box sx={classes.DetailRow}>
          {Object.keys(props.stats.power).map(key => {
            if (props.stats?.power[key] === 0) {
              return null
            } else {
              return <Box sx={classes.DetailItem}>{key}: {props.stats?.power[key]}</Box>
            }
          })}
        </Box>
        <Box>Type</Box>
        <Box sx={classes.DetailRow}>
          {Object.keys(props.stats.type).map(key => {
            if (props.stats?.type[key] === 0) {
              return null
            } else {
              return <Box sx={classes.DetailItem}>{key}: {props.stats?.type[key]}</Box>
            }
          })}
        </Box>
      </Box>
  }


  const uri = `/?ingredients=${props.ingredients.map(x => x.name).join(',')}&seasonings=${props.seasonings.map(x => x.name).join(',')}`

  const description = <Box><p>{props.description ? props.description : ''}</p></Box>

  return (
    <Tooltip title={
      <>
        <p>Ingredients: {props.ingredients.map(x => x.name).join(', ')}</p>
        <p>Seasonings: {props.seasonings.map(x => x.name).join(', ')}</p>
      </>}>
      <Box className='sandwich' sx={classes.Sandwich}> 
        <Link to={uri}>
          <Box className='title' display={"flex"} flexDirection={"row"}>
            <h3>{props.number ? `#${props.number}` : ''} {props.name || 'A Tasty Original'}</h3>
          </Box>
          {description}
          <Box display={"flex"} flexDirection={"column"}> {powers} </Box>
          <Box display={"flex"} flexDirection={"row"}> {ingredients} </Box>
          <Box display={"flex"} flexDirection={"row"}> {seasonings} </Box>
          <Box display={props.stats !== undefined && props.showDetails ? "flex" : "none"} flexDirection={"row"}>{details}</Box>
        </Link>
      </Box>
    </Tooltip>
  )
}