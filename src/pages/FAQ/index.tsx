import { useEffect } from 'react'
import { Box, Link } from '@mui/material';
import { TastePowerBonus } from '../../data/Cookbooks';

export default function FAQ() {
  useEffect(() => {
    document.title = "Sandwich Calculator: FAQ"
  }, [])

  return (
    <Box sx={{maxWidth: '60em', marginLeft: 'auto', marginRight: 'auto'}}>
      <div id="todo" className="content">
          <h2>How are sandwich powers calculated?</h2>
          <p>
            If you make a known in-game sandwich, that sandwich&apos;s powers are used. Known in-game sandwiches don&apos;t follow the rules.  Don&apos;t ask me why.
            If you&apos;ve got a custom sandwich, the basics (with a few exceptions like herba mystica powers) go like this:
          </p><ol>
              <li>
                Add everything together -- all tastes, types, and powers of all ingredients and seasonings<br/>
                Note that ingredient pieces count, so three avocado is 18 dragon since it&apos;s 6 <em>per piece</em>.
              </li>
              <li>Calculate <Link href="#flavor-bonuses">flavor bonuses</Link> for the top flavor or top two flavors in some situations</li>
              <li>Assign powers & levels -- if a power is less than 100 its level 1, if a power is less than 280 its level 2, otherwise its level 3. The top power is given the top type, the second power is given the third type, and the third power is given the second type. Idk why it was done this way, ask Game Freak.</li>
          </ol><p>
            Sandwiches with herba mystica (HM) have some additional considerations: one HM always gets you title power. Two HMs always gets you title and sparling power.    
          </p><p>
            If there&apos;s a tie in types, powers, or flavors, they&apos;re sorted in in-game order not alphabetical, so Normal will take prioroty over Flying, for instance.
          </p>
          <hr/>
          <h2>How do I make a sandwich that does {'<'}insert power{'>'}</h2>
          <p>
            For any level 1 power, its pretty easy, just make sure your powers and types are in the order you want for the powers you want. Going for the right flavor bonus will also help a lot.
          </p><p>
            For level 2 powers, getting the right type up to over 180 is the hadest part. I usually
            focus on getting type points as high as needed and then tweaking it to be the right 
            power(s). An easy way to do this is to use some of the three piece 12 type-point 
            ingredients (36 points per helping) combined with some 30 point one-piece ingredients. 
            In single player, you should be able to get several types over 180 this way. Once that&apos;s 
            set just need to tweak the recipe until the type and power you want are lined up, 
            usually by making sure both are the highest. I used this strategy to get <Link href="/?ingredients=Rice,Rice,Rice,Herbed%20Sausage,Herbed%20Sausage,Herbed%20Sausage&seasonings=whipped%20cream,horseradish,horseradish,chili%20sauce">
              Raid power: Fighting, Lv. 2 on a sandwich
            </Link>
          </p><p>
            For level 3 powers, you&apos;ve gotta use Herba Mystica or make the sandwich in multiplayer
          </p><p>
            Title Power requires at least one herba mystica, and Sparkling power requires at least two.
          </p>
          <hr/>
          <h2 id='flavor-bonuses'>What are flavor bonuses?</h2>
          <p>
            Every flavor, and some flavor combinations, have an assocated power bonus.  This bonus gives you +100 points to that power if: you have a flavor combo, you have 15 points of one flavor (but no combo), or if you have more than a certain number of ingredients (TODO, in progress).  The following flavors give bonuses, in this order.
          </p>
          <ol>
            {TastePowerBonus.map(taste => <li key={taste.taste.join(',')}>
              {taste.taste.join(' & ')}: +100 {taste.power} Power
            </li>)}
          </ol>
          <hr/>
          <h2>What do the colors mean when you are eating a sandwich?</h2>
          <p>These colors identify the most prominent flavor in your sandwich:</p>
          <ul><li>
            Pink and swirly: Sweet
          </li><li>
            Blue with electricity: Salty
          </li><li>
            Yellow and swirly: Sour
          </li><li>
            Flames: Hot
          </li><li>
            Brown ripples: Bitter
          </li></ul>
          <hr/>
      </div>
    </Box>
  )
}