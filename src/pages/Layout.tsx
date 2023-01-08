import { Box, Link, Theme, Typography, useTheme } from '@mui/material';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import res from '../res';
import './Layout.css';
import { useState } from 'react';


export default function Layout() {

  const [search, setSearch] = useState(useLocation().search)

  const theme = useTheme()
  const styles = (theme: Theme) => ({
    section: {
      textAlign: 'center',
      marginTop: '12pt',
      marginBottom: '12pt',
    },
    footerImage: {
      width: '90%'
    },
    app: {
      textAlign: 'left',
      padding: '.5em',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '90em',
    }
  })
  const classes = styles(theme)

  return (
    <>
      <div className="background-color"></div>
      <div className="background-image"></div>
      <Typography variant={'h1'} sx={classes.section}>
        Sandwich Calculator
      </Typography>
      <nav>
        <Box color={'primary'}>
          <Link component={NavLink} to={`/${search}`}>Home</Link> |&nbsp;
          <Link component={NavLink} to={`/Explore${search}`}>Explore Ingredients</Link> |&nbsp;
          <Link component={NavLink} to={`/Recipes${search}`}>Recipes & Cookbook</Link> |&nbsp;
          <Link component={NavLink} to={`/FAQ${search}`}>FAQ</Link> |&nbsp;
          <Link component={NavLink} to={`/About${search}`}>Help & About</Link>
        </Box>
      </nav>

      <Box sx={classes.app}> 
        <Outlet context={[setSearch]} />
      </Box>

      <Box sx={classes.section}>
        <Typography variant={'h2'}>Reporting A Bug</Typography>
        If you found a bug or have a suggestion, report it in the <Link href="https://www.reddit.com/user/enigma_0Z/comments/zfk3bz/pokemon_scarlet_violet_sandwich_calculator_bug/" target='_blank' rel="noreferrer">official reddit thread</Link>
      </Box>
      <Box sx={classes.section}>
          <Link href="https://www.youtube.com/channel/UCMVAWJUY88YlJlX88B0siDQ">YouTube</Link> |&nbsp;
          <Link href="https://twitter.com/enigma_0z">Twitter</Link> |&nbsp;
          <Link href="https://discord.gg/Wyemk6G28z">Discord</Link> |&nbsp;
          <Link href="https://www.patreon.com/enigmaplaysgames">Patreon</Link> |&nbsp;
          <Link href="https://enigma-plays-live.myspreadshop.com/">Merch</Link>
      </Box>
      <Box sx={classes.section}>
        <img style={{width: '80%', imageRendering: 'pixelated'}} src={res.img.logo} alt="enigma! logo" />
      </Box>
      <Box sx={classes.section}>
        <Link href="https://enigma0z.com/privacy.html">Privacy Policy</Link>
        <br/>
        <Link component='span' data-ccpa-link={1} />
      </Box>
      <Box sx={{...classes.section, height: '100px'}}/>
    </>
  )
}