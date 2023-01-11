import { Box, Link, Theme, Typography, useTheme } from '@mui/material';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import res from '../res';
import './Layout.css';
import { useEffect, useState } from 'react';
import { NitroPayConfig } from '../util/NitroPayConfig';

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
    gutter: {
      [theme.breakpoints.up('lg')]: {
        minWidth: '300px',
      },
      [theme.breakpoints.only('md')]: {
        minWidth: '160px',
      },
      [theme.breakpoints.down('md')]: {
        minWidth: '0px',
        display: 'none'
      }
    },
    layout: {
      display: 'flex',
      flexDirection: 'row'
    },
    app: {
      textAlign: 'left',
      padding: '10px',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.only('xl')]: { // 1536
        width: '1150px'
      },
      [theme.breakpoints.only('lg')]: { // 1200
        width: '850px'
      },
      [theme.breakpoints.only('md')]: { // 900
        width: '850px'
      },
      [theme.breakpoints.down('md')]: { // 900
        width: '100%'
      },
    }
  })

  const classes = styles(theme)

  useEffect(() => {
    //@ts-ignore
    window['nitroAds'].createAd('sandwich-bottom-anchor', {
      ...NitroPayConfig,
      "format": "anchor",
      "anchor": "bottom",
      "anchorPersistClose": false,
      "report": {
        "enabled": true,
        "icon": true,
        "wording": "Report Ad",
        "position": "top-left"
      },
      "mediaQuery": "(min-width: 320px) and (max-width: 899px)"
    });

  }, [])

  useEffect(() => {
    const stickyStackElement = document.getElementById('sandwich-right-gutter-sticky-stack')
    if (stickyStackElement) {
      if (stickyStackElement.innerHTML !== '') {
        stickyStackElement.innerHTML = ''
      }

      //@ts-ignore
      window['nitroAds'].createAd('sandwich-right-gutter-sticky-stack', {
        ...NitroPayConfig,
        "format": "sticky-stack",
        "stickyStackLimit": 15,
        "stickyStackSpace": 1.25,
        "stickyStackOffset": 200,
        "sizes": [
          [
            "160",
            "600"
          ]
        ],
        "report": {
          "enabled": true,
          "icon": true,
          "wording": "Report Ad",
          "position": "top-right"
        },
        "mediaQuery": "(min-width: 900px)"
      })
    }
  })

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

      <Box sx={classes.layout}>
        <Box sx={classes.app}>
          <Outlet context={[setSearch]} />
        </Box>
        <Box id={'sandwich-right-gutter-sticky-stack'} sx={classes.gutter} />
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
        <img style={{ width: '80%', imageRendering: 'pixelated' }} src={res.img.logo} alt="enigma! logo" />
      </Box>
      <Box sx={classes.section}>
        <Link href="https://enigma0z.com/privacy.html">Privacy Policy</Link>
        <br />
        <Link component='span' data-ccpa-link={1} />
      </Box>
      <Box sx={{ ...classes.section, height: '100px' }} />
    </>
  )
}