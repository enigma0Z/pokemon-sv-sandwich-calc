import { Cookbook, Ingredient } from './Cookbook'
import _CustomCookbook from './cookbook.json'
import _InGameCookbook from './recipe.json'
import _Sandwich from './sandwich.json'

export const CustomCookbook: Cookbook = _CustomCookbook
export const InGameCookbook: Cookbook = _InGameCookbook
export const Ingredients: Ingredient[] = _Sandwich.ingredients
export const Seasonings: Ingredient[] = _Sandwich.seasonings