import { Alert, AlertColor, Box, Chip, IconButton, Modal, Paper, Snackbar, Theme, Tooltip, Typography, useTheme } from '@mui/material';
import IngredientElement from './Ingredient';
import SeasoningElement from './Seasoning';
import './Sandwich.css'
import { Ingredient, Recipe } from '../data/Cookbook';
import StatBubbles from './StatBubbles';
import { powerName } from '../data/calc';
import { Sandwich as SandwichType } from '../data/Cookbook';
import { ContentCopy, IosShare, Warning } from '@mui/icons-material';
import { useState } from 'react';

type SnackbarState = {
  open: boolean,
  severity: AlertColor,
  message: string
}

export function sandwichUri(sandwich: SandwichType) {
  return ingredientsUri(sandwich.ingredients, sandwich.seasonings)
}

export function ingredientsUri(ingredients: (Ingredient | null)[], seasonings: (Ingredient | null)[]) {
  return `/${ingredientsQueryString(ingredients, seasonings)}`
}

export function ingredientsQueryString(ingredients: (Ingredient | null)[], seasonings: (Ingredient | null)[]) {
  for (let i = ingredients.length-1; i >= 0; i--) { 
    if (ingredients[i] === null) ingredients = ingredients.slice(0, i)
    else break 
  }

  for (let i = seasonings.length-1; i >= 0; i--) { 
    if (seasonings[i] === null) seasonings = seasonings.slice(0, i)
    else break 
  }

  const playersByIngredient = Math.ceil(ingredients.length / 6)
  const playersBySeasoning = Math.ceil(seasonings.length / 4)
  let players = playersByIngredient > playersBySeasoning ? playersByIngredient : playersBySeasoning // Take the larger of the two
  if (players === 0) players = 1

  console.log('ingredientsUri()', playersByIngredient, ingredients, playersBySeasoning, seasonings, players)
  return `?ingredients=${ingredients.map(x => x !== null && x !== undefined ? `${x.name}:${x.numPieces}` : '').join(',')}&seasonings=${seasonings.map(x => x !== null && x !== undefined ? x.name : '').join(',')}&players=${players}`
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
      color: '#000000',
      fontFamily: 'monospace',
      fontSize: '10pt',
      [theme.breakpoints.down('sm')]: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    SandwichLink: {
      textDecoration: 'none',
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
  })

  const classes = styles(theme)

  const [snackbar, setSnackbar]: [SnackbarState | undefined, (state: SnackbarState | undefined) => void] = useState()
  const [modalOpen, setModalOpen] = useState(false)

  const ingredients = props.sandwich.ingredients.map((x) => <IngredientElement name={x.name} />)
  const seasonings = props.sandwich.seasonings.map((x) => <SeasoningElement name={x.name} />)
  const powers = props.sandwich.powers.map((x) => {
    return (<Box>{powerName(x)}</Box>)
  })

  // if (props.sandwich.stats !== undefined) {
  //   <Box sx={classes.DetailBox}>
  //     <Box>Taste</Box>
  //     <Box sx={classes.DetailRow}>
  //       {Object.keys(props.sandwich.stats.taste).map(key => {
  //         if (props.sandwich.stats?.taste[key] === 0) {
  //           return null
  //         } else {
  //           return <Box sx={classes.DetailItem}>{key}: {props.sandwich.stats?.taste[key]}</Box>
  //         }
  //       })}
  //     </Box>
  //     <Box>Power</Box>
  //     <Box sx={classes.DetailRow}>
  //       {Object.keys(props.sandwich.stats.power).map(key => {
  //         if (props.sandwich.stats?.power[key as MealPower] === 0) {
  //           return null
  //         } else {
  //           return <Box sx={classes.DetailItem}>{key}: {props.sandwich.stats?.power[key as MealPower]}</Box>
  //         }
  //       })}
  //     </Box>
  //     <Box>Type</Box>
  //     <Box sx={classes.DetailRow}>
  //       {Object.keys(props.sandwich.stats.type).map(key => {
  //         if (props.sandwich.stats?.type[key] === 0) {
  //           return null
  //         } else {
  //           return <Box sx={classes.DetailItem}>{key}: {props.sandwich.stats?.type[key]}</Box>
  //         }
  //       })}
  //     </Box>
  //   </Box>
  // }

  const description = <Box><p>{props.sandwich.description ? props.sandwich.description : ''}</p></Box>

  return (
    <Tooltip title={
      <>
        <p>Ingredients: {props.sandwich.ingredients.map(x => x.name).join(', ')}</p>
        <p>Seasonings: {props.sandwich.seasonings.map(x => x.name).join(', ')}</p>
      </>}>
      <Box sx={classes.Sandwich}>
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
        <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
          {props.sandwich.warning ? <Chip color='error' icon={<Warning />} label='This sandwich may fail' /> : ''}
        </Box>
        <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} justifyContent={'right'} >
          <IconButton
            color='inherit'
            onClick={async () => {
              if (window.navigator.share) {
                await window.navigator.share({ title: 'Sandwich!!', url: '' })
              } else {
                setModalOpen(true)
              }
            }}
          >
            <IosShare />
          </IconButton>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbar?.open}
          autoHideDuration={6000}
          onClose={() => {
            if (snackbar !== undefined) {
              setSnackbar({ ...snackbar, open: false })
            }
          }}
        >
          <Alert variant='filled' color={snackbar?.severity} severity={snackbar?.severity}>{snackbar?.message}</Alert>
        </Snackbar>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sx={{
            display: 'flex'
          }}
        >
          <Paper sx={{
            borderRadius: '1em',
            [theme.breakpoints.down('sm')]: {
              width: '85%',
            },
            [theme.breakpoints.up('sm')]: {
              width: '30em',
            },
            padding: '1em',

            marginTop: 'auto',
            marginBottom: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',

            border: '1px solid #FFFFFF40'
          }}>
            <Box display={'flex'} flexDirection={'column'}>
              <Typography variant='h2' gutterBottom>
                Share Your Sandwich
              </Typography>
              <Box
                border={1}
                borderColor={'#FFFFFF20'}
                borderRadius='.5em'
                paddingLeft='.5em'
                paddingRight='.5em'
                paddingTop='.25em'
                paddingBottom='.25em'
                display={'flex'}
                flexBasis={'100%'}
                alignItems='center'
              >
                <Typography variant='caption' display={'inline-block'} whiteSpace={'nowrap'} width='100%' overflow={'hidden'}>
                  {window.location.protocol}{'//'}{window.location.host}{sandwichUri(props.sandwich)}
                </Typography>
                  <Chip
                    icon={<ContentCopy />}
                    label="Copy"
                    size='small'
                    sx={{ justifySelf: 'right' }}
                    onClick={async (event) => {
                      console.log(event)
                      let copyText = ''
                      let copyType = ''
                      if (event.shiftKey && event.metaKey) {
                        copyText = JSON.stringify({
                          name: "",
                          description: "",
                          ingredients: props.sandwich.ingredients.map(x => `${x.name}:${x.numPieces}`),
                          seasonings: props.sandwich.seasonings.map(x => x.name),
                          powers: props.sandwich.powers
                        })
                        copyType = 'JSON'
                      } else {
                        copyText = `${window.location.protocol}//${window.location.host}${sandwichUri(props.sandwich)}`
                        copyType = 'URL'
                      }
                      try {
                        await navigator.clipboard.writeText(copyText)
                        setSnackbar({ open: true, severity: 'success', message: `${copyType} copied to clipboard!` })
                      } catch (err) {
                        setSnackbar({ open: true, severity: 'error', message: `Could not copy ${copyType} to clipboard.` })
                      }
                    }}
                  />
              </Box>
            </Box>
          </Paper>
        </Modal>
      </Box>
    </Tooltip>
  )
}