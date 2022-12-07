import './App.css';
import './style/main.css';
import { renderUi } from './scripts/ui.js'
import { useEffect } from 'react';
import { default as img } from './res/img/all.js'

function App() {
  useEffect(() => {
    const head = document.querySelector("head");
    const adsense = document.createElement("script");

    adsense.setAttribute("src", "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6012158634418176");
    adsense.setAttribute('async', '')
    adsense.setAttribute('crossorigin', 'anonymous')
    head.appendChild(adsense);

    // const oldui = document.createElement("script");
    // oldui.setAttribute("src", "/v2/scripts/ui.js");
    // oldui.setAttribute('type', 'module')
    // head.appendChild(oldui);

    console.log('useEffect()')
    renderUi()

    return () => {
      head.removeChild(adsense);
      // head.removeChild(oldui);
    };
  })
  // renderUi()
  return (
    <div className="App">
      <div class="background-color"></div>
      <div class="background-image"></div>
      <div class="section"><h1>
        Sandwich Calculator
      </h1></div>
      <div id="sandwich" class="content"></div>
      <div id="todo" class="content">
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
            Penalty for too many ingredients (>13 in Single Player)
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
      <div id="notes" class="content">
        <h2>Notes</h2>
        <ul><li>
          Yes I know it's ugly. I'm working on it after I get the math close enough to right
        </li><li>
            Known recipes powers are hardcoded and they don't follow the same values as DIY ones.
          </li></ul>
      </div>
      <div id="known issues" class="content">
        <h2>Known Issues</h2>
        <ul><li>
          Defined (in-game) recpies are goofy and don't calc correctly
        </li><li>
            Flavor bonuses only occur or get calculated sometimes.  Unknown why / when.
          </li></ul>
      </div>
      <div class="section">
        <span class="caption">
          <a href="https://www.youtube.com/channel/UCMVAWJUY88YlJlX88B0siDQ">YouTube</a> |&nbsp;
          <a href="https://twitter.com/enigma_0z">Twitter</a> |&nbsp;
          <a href="https://discord.gg/Wyemk6G28z">Discord</a> |&nbsp;
          <a href="https://www.patreon.com/enigmaplaysgames">Patreon</a> |&nbsp;
          <a href="https://enigma-plays-live.myspreadshop.com/">Merch</a>
        </span>
      </div>
      <div class="section">
        <img class="header" src={img.enigma} />
      </div>
    </div>
  );
}

export default App;
