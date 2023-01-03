export type SandwichPower = {
  name: string,
  type?: string | null,
  level: number
}

export type Recipe = {
  name?: string; 
  description: string,
  location?: string,
  number?: number,
  ingredients: string[],
  seasonings: string[],
  powers: SandwichPower[]
}

export type Cookbook = {
  recipes: Recipe[]
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
  powers: SandwichPower[];
}

export type SandwichStats = {
  taste: Ingredient['taste']
  power: Ingredient['power']
  type: Ingredient['type']
}

export type PowerRequirement = {
  power: SandwichPower,
  powerAmount: number,
  typeAmount: number,
  achieved?: boolean
}

export type DisplayRequirement = {
  power: SandwichPower,
  components: DisplayRequirementComponent[]
}

export type DisplayRequirementComponent = {
  name: string,
  value: string | number | boolean,
  success?: boolean
}

export type PokemonType = 
  'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' |
  'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' | 'Ice' | 'Dragon' | 'Dark' | 'Fairy'

export type MealPower = 
  'Egg' | 'Catching' | 'Exp.' | 'Item Drop' | 'Raid' |
  'Title' | 'Sparkling' | 'Humungo' | 'Teensy' | 'Encounter'

export type Taste =
  'Sweet' | 'Salty' | 'Sour' | 'Bitter' | 'Hot'