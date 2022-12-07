import { Link, Outlet, useLocation } from 'react-router-dom';
import res from '../res';
import './Layout.css';

export default function Layout() {
  const { pathname, search } = useLocation()
  const SubtitleMap: {[index: string]: string} = {
    '/': 'Home',
    '/explore': 'Ingredient Explorer',
    '/recipes': 'Cookbook',
  }

  let subtitle = pathname
  if (pathname in SubtitleMap) {
    subtitle = SubtitleMap[pathname]
  }

  return (
    <>
      <div className="background-color"></div>
      <div className="background-image"></div>
      <div className="section">
        <h1>Sandwich Calculator</h1>
      </div>
      <nav style={{
        // display: 'none'
      }}>
        <ul>
          <li>
            <Link to={`/${search}`}>Home</Link> |&nbsp;
            <Link to={`/explore${search}`}>Explore Ingredients</Link> |&nbsp;
            <Link to={`/recipes${search}`}>Recipes & Cookbook</Link>
          </li>
        </ul>
      </nav>

      <Outlet />

      <div className="section">
        <span className="caption">
          <a href="https://www.youtube.com/channel/UCMVAWJUY88YlJlX88B0siDQ">YouTube</a> |&nbsp;
          <a href="https://twitter.com/enigma_0z">Twitter</a> |&nbsp;
          <a href="https://discord.gg/Wyemk6G28z">Discord</a> |&nbsp;
          <a href="https://www.patreon.com/enigmaplaysgames">Patreon</a> |&nbsp;
          <a href="https://enigma-plays-live.myspreadshop.com/">Merch</a>
        </span>
      </div>
      <div className="section">
        <img className="header" src={res.img.logo} alt="enigma! logo" />
      </div>
    </>
  )
}