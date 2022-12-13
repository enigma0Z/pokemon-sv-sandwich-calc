import { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function FAQ() {
  useEffect(() => {
    document.title = "Sandwich Calculator: FAQ"
  }, [])

  return (
    <>
      <div id="todo" className="content">
        <ul><li>
          <h2>How are sandwich powers calculated?</h2>
          <p>
            If you make a known in-game sandwich, that sandwich's powers are used. Known in-game sandwiches don't follow the rules.
          </p><p>
            If you've got a custom sandwich, the basics (with a few exceptions like herba mystica powers) go like this:
            <ol>
              <li>Add all ingredients and seasonings together, every infredient piece coints (e.g. avocados have three pieces per serving, so they give 18 dragon)</li>
              <li>Calculate flavor bonuses -- the top flavor (or top two for sweet & salty, sweet & hot, and bitter & salty) adds an additional 100 points to a specific power if the top type is 180 or higher</li>
              <li>Assign powers & levels -- if a power is less than 100 its level 1, if a power is less than 280 its level 2, otherwise its level 3. The top power is given the top type, the second power is given the third type, and the third power is given the second type. Idk why it was done this way, ask Game Freak.</li>
            </ol>
            Sandwiches with herba mystica (HM) have some additional considerations: one HM always gets you title power. Two HMs always gets you title and sparling power.    
          </p><p>
            If there's a tie in types, powers, or flavors, they're sorted in in-game order not alphabetical, so Normal will take prioroty over Flying, for instance.
          </p>
          <hr/>
        </li><li>
          <h2>How do I make a sandwich that does {'<'}insert power{'>'}</h2>
          <p>
            For any level 1 power, its pretty easy, just make sure your powers and types are in the order you want for the powers you want. Going for the right flavor bonus will also help a lot.
          </p><p>
            For level 2 powers, getting the right type up to over 180 is the hadest part. I usually
            focus on getting type points as high as needed and then tweaking it to be the right 
            power(s). An easy way to do this is to use some of the three piece 12 type-point 
            ingredients (36 points per helping) combined with some 30 point one-piece ingredients. 
            In single player, you should be able to get several types over 180 this way. Once that's 
            set just need to tweak the recipe until the type and power you want are lined up, 
            usually by making sure both are the highest. I used this strategy to get <Link to="/?ingredients=Rice,Rice,Rice,Herbed%20Sausage,Herbed%20Sausage,Herbed%20Sausage&seasonings=whipped%20cream,horseradish,horseradish,chili%20sauce">
              Raid power: Fighting, Lv. 2 on a sandwich
            </Link>
          </p><p>
            For level 3 powers, you've gotta use Herba Mystica or make the sandwich in multiplayer
          </p><p>
            Title Power requires at least one herba mystica, and Sparkling power requires at least two.
          </p>
          <hr/>
        </li><li>
          <h2>What are flavor bonuses?</h2>
          <p>
            Every flavor, and some flavor combinations, have an assocated power bonus.  This bonus gives you +100 points to that power when the associated type is 180 points or greater.  The following flavors give bonuses, in this order.
            <ol><li>
              Sweet & Sour: +100 Catching Power
            </li><li>
              Sweet & Hot: +100 Raid Power
            </li><li>
              Salty & Bitter: +100 Exp. Power
            </li><li>
              Sweet: +100 Egg Power
            </li><li>
              Salty: +100 Encounter Power
            </li><li>
              Sour: +100 Teensy Power
            </li><li>
              Bitter: +100 Item Drop Power
            </li><li>
              Hot: +100 Humungo Power
            </li></ol>
          </p>
          <hr/>
        </li></ul>
      </div>
    </>
  )
}