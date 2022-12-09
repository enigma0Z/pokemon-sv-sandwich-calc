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
    <div id="sandwich" className="content"></div>
  );
}

export default App;
