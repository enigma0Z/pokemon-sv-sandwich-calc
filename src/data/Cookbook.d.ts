export type Powers = {
  name: string,
  type: string,
  level: number
}

export type Recipe = {
  description: string,
  location: string,
  number: string | null,
  ingredients: string[],
  seasonings: string[],
  powers: Power[]
}

export type Cookbook = {
  recipes: Recepie[]
}