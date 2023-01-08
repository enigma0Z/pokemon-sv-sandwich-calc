import { Ingredient } from "../data/Cookbook"
import { Ingredients, Seasonings } from "../data/Cookbooks"


export default class QueryStringProps {
  ingredients: (Ingredient | null)[]
  seasonings: (Ingredient | null)[]
  players: number

  constructor(props?: string) {
    this.ingredients = []
    this.seasonings = []
    this.players = 0

    if (props) {
      for (let entry of props.split('&')) {
        let [name, valuesStr] = entry.split('=')
        let values = decodeURIComponent(valuesStr).split(',')
        if (name === 'ingredients') {
          for (let value of values) {
            let foundIngredient = Ingredients.find(ingredient => ingredient.name.toLowerCase() === value.toLowerCase())
            if (foundIngredient !== undefined) {
              let appliedIngredient = { ...foundIngredient }
              appliedIngredient.numPieces = foundIngredient.maxPieces
              this.ingredients.push(appliedIngredient)
            } else {
              this.ingredients.push(null)
            }
          }
        } else if (name === 'seasonings') {
          for (let value of values) {
            let foundSeasoning = Seasonings.find(seasoning => seasoning.name.toLowerCase() === value.toLowerCase())
            if (foundSeasoning !== undefined) {
              this.seasonings.push(foundSeasoning)
            } else {
              this.seasonings.push(null)
            }
          }
        } else if (name === 'players') {
          this.players = parseInt(values[0])
        }
      }
    }
  }
}
