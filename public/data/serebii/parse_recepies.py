#!/usr/bin/env python3

import yaml

# Define a filename.
filename = "recipe.txt"

# Open the file as f.
# The function readlines() reads the file.
with open(filename) as f:
    content = f.read().splitlines()

recipes = []
buffer = []
number = 0
for line in content:
  buffer.append(line)
  if line.startswith('Recipe Location'):
    number += 1
    # Parse the buffer
    title = buffer[0].split('\t')[0].strip()
    description = buffer[0].split('\t')[2].strip()

    ingredients = []
    seasonings = []
    powers = []
    ingredients_flag = True
    powers_flag = False
    for buffer_line in buffer:
      if (len(buffer_line.split('\t')) > 2):
        continue
      elif (buffer_line == '\t'): 
        ingredients_flag = False
        continue
      elif (buffer_line.startswith('\t')):
        powers_flag = True
        buffer_line = buffer_line.strip()
      elif (buffer_line.startswith('Recipe Location')):
        break

      if (powers_flag):
        power = buffer_line.split(' ')[0]
        level = buffer_line.split(' Lv. ')[1]
        type = None
        if (power != 'Egg'):
          type = buffer_line.split(': ')[1].split(' ')[0]
        powers.append({
          'name': power,
          'type': type,
          'level': int(level)
        })
      else:
        if (ingredients_flag):
          ingredients.append(buffer_line.split('\t')[0])
        else:
          seasonings.append(buffer_line.split('\t')[0])
    location = buffer[-1].split(': ')[1]

    # print('title:', title)
    # print('description:', description)
    # print('ingredients', ingredients)
    # print('seasonings', seasonings)
    # print('powers', powers)
    # print('location', location)

    recipes.append({
      'name': title,
      'number': number,
      'description': description,
      'ingredients': ingredients,
      'seasonings': seasonings,
      'powers': powers,
      'location': location
    })

    buffer = []

print(yaml.dump({'recipes': recipes}))