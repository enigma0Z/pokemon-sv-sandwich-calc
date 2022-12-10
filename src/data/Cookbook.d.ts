export type Power = {
  name: string,
  type: string,
  level: number
}

export type Recipe = {
  name?: string; 
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

export type Ingredient = {
  max?: number,
  name: string,
  power: {
    [index: string],
    'Egg'?: number,
    'Catching'?: number,
    'Exp.'?: number,
    'Item Drop'?: number,
    'Raid'?: number,
    'Title'?: number,
    'Sparkling'?: number,
    'Humungo'?: number,
    'Teensy'?: number,
    'Encounter'?: number,
  },
  taste: {
    [index: string],
    'Sweet'?: number,
    'Salty'?: number,
    'Sour'?: number,
    'Bitter'?: number,
    'Hot'?: number,
  }
  type: {
    [index: string],
    'Normal'?: number,
    'Fighting'?: number,
    'Flying'?: number,
    'Poison'?: number,
    'Ground'?: number,
    'Rock'?: number,
    'Bug'?: number,
    'Ghost'?: number,
    'Steel'?: number,
    'Fire'?: number,
    'Water'?: number,
    'Grass'?: number,
    'Electric'?: number,
    'Psychic'?: number,
    'Ice'?: number,
    'Dragon'?: number,
    'Dark'?: number,
    'Fairy'?: number,
  }
}

export type Sandwich = {
  name?: string;
  description?: string;
  location?: string;
  number?: number;
  stats?: SandwichStats; // Not present if not calculated -- in-game cookbook sandwiches don't care abou this
  ingredients: Ingredient[]; 
  seasonings: Ingredient[]; 
  powers: Power[];
}

export type SandwichStats = {
  taste: Ingredient['taste']
  power: Ingredient['power']
  type: Ingredient['type']
}