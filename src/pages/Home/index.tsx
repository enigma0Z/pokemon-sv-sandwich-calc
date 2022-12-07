import './index.css';
import { renderUi } from '../../scripts/ui.js'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const head = document.querySelector("head");
    if (head !== null) {
      const adsense = document.createElement("script");

      adsense.setAttribute("src", "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6012158634418176");
      adsense.setAttribute('async', '')
      adsense.setAttribute('crossorigin', 'anonymous')
      head.appendChild(adsense);

      console.log('useEffect()')
      renderUi()

      return () => {
        head.removeChild(adsense);
      };
    }
  })
  return (
    <div className="App">
      <div id="sandwich" className="content"></div>
      <div id="todo" className="content">
        <h2>Todo</h2>
        <ul><li>
          Multiplayer mode
        </li><li>
            Reverse mode -- Specify powers & types and generate a sandwich that partially or fully fulfils this condition
          </li><li>
            Option for less than perfection in ingredients placed
          </li><li>
            Penalty for sandwich failure
          </li><li>
            Penalty for too many ingredients ({'>'}13 in Single Player)
          </li><li>
            Add known recipes
          </li><li>
            Type/power/flavor filtering or searching
          </li><li>
            Recipe suggestions based on sandwich goals
          </li><li>
            Database of useful DIY sandwiches
          </li><li>
            Add ingredient pics / custom select box?
          </li><li>
            Rewrite the UI in react &lt;_&lt;
          </li></ul>
      </div>
      <div id="notes" className="content">
        <h2>Notes</h2>
        <ul><li>
          Yes I know it's ugly. I'm working on it after I get the math close enough to right
        </li><li>
            Known recipes powers are hardcoded and they don't follow the same values as DIY ones.
          </li></ul>
      </div>
      <div id="known issues" className="content">
        <h2>Known Issues</h2>
        <ul><li>
          Defined (in-game) recpies are goofy and don't calc correctly
        </li><li>
            Flavor bonuses only occur or get calculated sometimes.  Unknown why / when.
          </li></ul>
      </div>
    </div>
  );
}

export default App;