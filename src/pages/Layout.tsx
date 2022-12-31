import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import res from '../res';
import './Layout.css';
import { theme } from '../res/theme';
import { useState } from 'react';


export default function Layout() {

  const [search, setSearch] = useState(useLocation().search)

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="background-color"></div>
        <div className="background-image"></div>
        <div className="section">
          <h1>Sandwich Calculator</h1>
        </div>
        <nav>
          <Box>
            <Link to={`/${search}`}>Home</Link> |&nbsp;
            <Link to={`/Explore${search}`}>Explore Ingredients</Link> |&nbsp;
            <Link to={`/Recipes${search}`}>Recipes & Cookbook</Link> |&nbsp;
            <Link to={`/FAQ${search}`}>FAQ</Link> |&nbsp;
            <Link to={`/About${search}`}>Help & About</Link>
          </Box>
        </nav>

        <Box className="App">
          <Outlet context={[setSearch]}/>
        </Box>

        <div className='section' style={{marginBottom: '3em'}}>
          <h2>Reporting A Bug</h2>
          If you found a bug or have a suggestion, report it in the <a href="https://www.reddit.com/user/enigma_0Z/comments/zfk3bz/pokemon_scarlet_violet_sandwich_calculator_bug/" target='_blank' rel="noreferrer">official reddit thread</a>
        </div>
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
          <ul><li>
            <a href="https://enigma0z.com/privacy.html">Privacy Policy</a>
          <li></li>
            <span data-ccpa-link="1"></span>
          </li></ul>
        </div>
        <div className="section" style={{height: '100px'}}></div>
      </ThemeProvider>
    </>
  )
}