import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import res from '../res';
import { themeOptions } from '../res/theme';
import './Layout.css';

export default function Layout() {

  const theme = createTheme(themeOptions)
  const { search } = useLocation()

  return (
    <>
      <ThemeProvider theme={theme}>
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
              <Link to={`/recipes${search}`}>Recipes & Cookbook</Link> |&nbsp;
              <a href="https://www.reddit.com/user/enigma_0Z/comments/zfk3bz/pokemon_scarlet_violet_sandwich_calculator_bug/" target='_blank' rel="noreferrer">Report A Bug</a>
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
        <div className="section">
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6012158634418176"
            crossOrigin="anonymous"></script>
          {/* Bottom Banner Ad */}
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-6012158634418176"
            data-ad-slot="8019985505"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({ });
          </script>
        </div>
      </ThemeProvider>
    </>
  )
}