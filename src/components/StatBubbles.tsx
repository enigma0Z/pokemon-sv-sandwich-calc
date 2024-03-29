import { Box, Chip, Theme, useTheme } from "@mui/material"
import { sortAttributes, sortValuePower, sortValueTaste, sortValueType } from "../data/calc"
import { Ingredient } from "../data/Cookbook"

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    black: true;
    sweet: true;
    hot: true;
    sour: true;
    bitter: true;
    salty: true;
  }
}

export default function StatBubbles(props: {
  taste?: Ingredient['taste'], 
  power?: Ingredient['power'], 
  type?: Ingredient['type'], 
  amount?: number,
  showZero?: boolean,
}) {
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
    DetailChip: {
      margin: '.25em', 
      height: '1.75em', 
      fontSize: '8pt',
    },
    ChipLightBorder: {
      border: '1px solid lightgrey'
    },
    ChipDarkBorder: {
      border: '1px solid darkgrey'
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
      color: 'white',
      borderRadius: '.5em',
      border: 'solid 1px darkgrey'
    }
  })

  const classes = styles(theme)

  const elements = []

  const amount = props.amount ? props.amount : 1

  if (props.amount !== undefined && props.amount > 1) {
    elements.push(<Box>Max Pieces: {amount}</Box>)
  }

  if (props.taste !== undefined) {
    elements.push(<Box key='taste-header'>Taste</Box>)
    const bubbles = []
    for (let obj of sortAttributes(props.taste, sortValueTaste)) {
      if (obj.value === 0 && !props.showZero) continue
      bubbles.push(<Chip 
        key={obj.name.toLowerCase()}
        sx={{...classes.DetailChip, ...classes.ChipLightBorder}}
        //@ts-ignore
        color={obj.name.toLowerCase()}
        size={'small'}
        label={`${obj.name}: ${obj.value * amount}`}
      />)
    }
    elements.push(
      <Box key='taste-bubbles' sx={classes.DetailRow}>
        {bubbles}
      </Box>
    )
  }

  if (props.power !== undefined) {
    elements.push(<Box key='power-header'>Power</Box>)
    const bubbles = []
    for (let obj of sortAttributes(props.power, sortValuePower)) {
      if (obj.value === 0 && !props.showZero) continue
      bubbles.push(<Chip 
        key={`${obj.name}`}
        sx={{...classes.DetailChip, ...classes.ChipDarkBorder}}
        color={'black'}
        label={`${obj.name}: ${obj.value * amount}`}
      />)
    }
    elements.push(
      <Box key='power-bubbles' sx={classes.DetailRow}>
        {bubbles}
      </Box>
    )
  }

  if (props.type !== undefined) {
    elements.push(<Box key='type-header'>Type</Box>)
    const bubbles = []
    for (let obj of sortAttributes(props.type, sortValueType)) {
      if (obj.value === 0 && !props.showZero) continue
      bubbles.push(<Chip 
        key={obj.name.toLowerCase()}
        sx={{...classes.DetailChip, ...classes.ChipDarkBorder}}
        //@ts-ignore
        color={obj.name.toLowerCase()}
        label={`${obj.name}: ${obj.value * amount}`}
      />)
    }
    elements.push(
      <Box key='type-bubbles' sx={classes.DetailRow}>
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