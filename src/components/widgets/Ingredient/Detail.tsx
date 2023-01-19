import css from './Ingredient.module.css'

import res, { imageName } from '@/res'
import { Box, Theme, Typography, useTheme } from '@mui/material';
import { Ingredients, Seasonings } from '@/data/Cookbooks';
import StatBubbles from '@/components/StatBubbles';
import { Ingredient } from '@/data/Cookbook';
import IngredientImage from './Image';

export default function IngredientDetail(props: { visible?: boolean, name: string, kind: "ingredient" | "seasoning" } ) {
  const theme = useTheme()
  const styles = (theme: Theme) => ({
    IngredientBox: {
      [theme.breakpoints.down('sm')]: {
        width: '100%'
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

  if ((props.visible === true || props.visible === undefined) && ingredient !== undefined) {
    
    return (
      <Box sx={classes.IngredientBox} className={css.IngredientBox}>
        <Box className={css.IngredientTitle}>
          <IngredientImage kind={props.kind} name={ingredient.name} />
          {ingredient.name}
        </Box>
        <StatBubbles taste={ingredient.taste} power={ingredient.power} type={ingredient.type} amount={ingredient.numPieces} />
      </Box>
    )
  }

  return null
}