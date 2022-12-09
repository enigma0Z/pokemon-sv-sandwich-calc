import { Box } from '@mui/material'
import React, { Component } from 'react'
import Sandwich from '../../components/Sandwich'
import CustomCookbook from '../../data/cookbook.json'
import InGameCookbook from '../../data/recipe.json'
import './index.css'

export default class Recipes extends Component {

  render() {
    const customSandwiches = CustomCookbook.recipes.map((recipe) => <Sandwich {...recipe} />)
    const inGameSandwiches = InGameCookbook.recipes.map((recipe) => <Sandwich {...recipe} />)

    return (
      <Box >
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {customSandwiches}
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {inGameSandwiches}
        </Box>
      </Box>
    )
  }
}