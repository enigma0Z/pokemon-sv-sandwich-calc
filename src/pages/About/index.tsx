import { Box } from '@mui/material'
import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    document.title = "Sandwich Calculator: Help & About"
  }, [])
  return (
    <>
      <div id="todo" className="content">
        <h2>Todo</h2>
          <ul><li>
            Add sandwich construction notes/comments as an additional detail
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
        <h2>Thanks to all the bug reporters!!</h2>
        
      </Box>
    </>
  )
}