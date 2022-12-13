import res, { imageName } from '../res'
import { Box, Theme, useTheme } from '@mui/material';
import { Ingredients, Seasonings } from '../data/Cookbooks';
import StatBubbles from './StatBubbles';
import { Ingredient } from '../data/Cookbook';

export default function IngredientDetail(props: { name: string, kind: "ingredient" | "seasoning" } ) {
  const theme = useTheme()
  const styles = (theme: Theme) => ({
    IngredientBox: {
      display: 'flex',
      flexDirection: 'column',
      padding: '.5em',
      backgroundColor: '#C0FFFF',
      borderRadius: '16px',
      border: 'solid 4px black',
      width: '20em',
      color: 'black',
      [theme.breakpoints.down('md')]: {
        width: 'auto'
      }
    },
    IngredientTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '16px',
      paddingLeft: '.5em',
      paddingRight: '.5em',
      border: 'solid 1px black',
      fontWeight: 'bold',
    },
  })
  const classes = styles(theme)

  let ingredient: Ingredient | undefined
  let img: JSX.Element | undefined
  if (props.kind === 'ingredient') {
    ingredient = Ingredients.find(x => imageName(x.name) === imageName(props.name))
  } else if (props.kind === 'seasoning') {
    ingredient = Seasonings.find(x => imageName(x.name) === imageName(props.name))
  }

  if (ingredient !== undefined) {
    if (props.kind === 'ingredient') {
      img = <img src={res.img.ingredients[imageName(ingredient.name)]}/>
    } else if (props.kind === 'seasoning') {
      img = <img src={res.img.seasonings[imageName(ingredient.name)]}/>
    }
    return (
      <Box sx={classes.IngredientBox}>
        <Box sx={classes.IngredientTitle}>
          {img} {ingredient.name}
        </Box>
        <StatBubbles taste={ingredient.taste} power={ingredient.power} type={ingredient.type} amount={ingredient.max} />
      </Box>
    )
  }

  return null
}