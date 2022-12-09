import { Box } from '@mui/material'

export default function Bugs() {
  return (
    <>
      <div id="todo" className="content">
        <h2>Todo</h2>
          <ul><li>
            Rewrite the main sandwich builder page in React & make it prettier
          </li><li>
            Show if a built recipe matches a known one (in game or on this site)
          </li><li>
            Multiplayer mode -- I don't know if the recipe values get calculated differently here, need to experiment
          </li><li>
            Reverse mode -- Specify powers & types and generate a sandwich that partially or fully fulfils this condition
          </li><li>
            Ability to specify how many ingredients are placed on a sandwich (e.g. 2 out of 3 banana pieces)
          </li><li>
            Penalty calculations: Sandwich failure, too many ingredients ({'>'}13 in Single Player)
          </li><li>
            Recipe suggestions based on sandwich goals
          </li></ul>
      </div>
      <div id="known issues" className="content">
        <h2>Known Issues & Quirks</h2>
        <ul><li>
          In-game recipes get different bonuses than the "technically correct" calculated result
        </li><li>
          Flavor bonuses only occur or get calculated sometimes.  Unknown why / when.
        </li></ul>
      </div>
      <Box>
        <h2>Reporting A Bug</h2>
        If you found a bug or have a suggestion, report it in the <a href="https://www.reddit.com/user/enigma_0Z/comments/zfk3bz/pokemon_scarlet_violet_sandwich_calculator_bug/" target='_blank' rel="noreferrer">official reddit thread</a>
      </Box>
    </>
  )
}