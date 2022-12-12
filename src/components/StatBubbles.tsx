import { Box, Theme, useTheme } from "@mui/material"
import { Ingredient } from "../data/Cookbook"

export default function StatBubbles(props: {taste?: Ingredient['taste'], power?: Ingredient['power'], type?: Ingredient['type'], amount?: number}) {
  const theme = useTheme()
  const styles = (theme: Theme) => ({
    IngredientSelect: {
      display: 'flex',
      flexDirection: 'column',
      width: '15em',
      margin: '.25em',
      [theme.breakpoints.down('md')]: {
        flexBasis: '47%',
      }
    },
    DetailBox: {
      marginTop: '.25em',
      fontSize: '8pt',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column'
    },
    DetailRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    DetailItem: {
      margin: '.25em',
      paddingLeft: '.5em',
      paddingRight: '.5em',
      paddingTop: '.1em',
      paddingBottom: '.1em',
      backgroundColor: 'black',
      borderRadius: '.5em',
      border: 'solid 1px darkgrey'
    }
  })

  const classes = styles(theme)

  const elements = []

  const amount = props.amount ? props.amount : 1

  if (props.amount !== undefined) {
    elements.push(<Box>Amount: {amount}</Box>)
  }

  if (props.taste !== undefined) {
    elements.push(<Box>Taste</Box>)
    const bubbles = []
    for (let key of Object.keys(props.taste)) {
      bubbles.push(<Box sx={classes.DetailItem}>{key}: {props.taste[key] * amount}</Box>)
    }
    elements.push(
      <Box sx={classes.DetailRow}>
        {bubbles}
      </Box>
    )
  }

  if (props.power !== undefined) {
    elements.push(<Box>power</Box>)
    const bubbles = []
    for (let key of Object.keys(props.power)) {
      bubbles.push(<Box sx={classes.DetailItem}>{key}: {props.power[key] * amount}</Box>)
    }
    elements.push(
      <Box sx={classes.DetailRow}>
        {bubbles}
      </Box>
    )
  }

  if (props.type !== undefined) {
    elements.push(<Box>type</Box>)
    const bubbles = []
    for (let key of Object.keys(props.type)) {
      bubbles.push(<Box sx={classes.DetailItem}>{key}: {props.type[key] * amount}</Box>)
    }
    elements.push(
      <Box sx={classes.DetailRow}>
        {bubbles}
      </Box>
    )
  }

  return (
    <Box sx={classes.DetailBox}>
      {elements}
    </Box>
  )
}