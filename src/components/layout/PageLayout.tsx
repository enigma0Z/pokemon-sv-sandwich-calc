'use client';

import { Box, Link, Theme, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import NitroPayConfig from "@/util/NitroPay/Config";
import NavBar from "./NavBar";
import { DomLink } from "../DomLink";

const GUTTER_BREAKPOINT = 1536
const ANCHOR_BREAKPOINT = 900
const RIGHT_GUTTER_ID = 'sandwich-right-gutter-sticky-stack'
const BOTTOM_ANCHOR_ID = 'sandwich-bottom-anchor'
let previousWidth: number = NaN

function createBottomAnchorAd(w: Window) {
  console.log('Bottom Anchor Ad')
  //@ts-ignore
  window['nitroAds'].createAd(BOTTOM_ANCHOR_ID, {
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
    "mediaQuery": "(min-width: 320px)"
  });
}

function createStickyStackAd(w: Window) {
  const stickyStackElement = document.getElementById(RIGHT_GUTTER_ID)
  if (stickyStackElement) {
    if (stickyStackElement.innerHTML !== '') {
      stickyStackElement.innerHTML = ''
    }
  }

  const sizes = []

  if (window.innerWidth >= 1536) {
    sizes.push(['300', '600'], ['300', '250'])
  }

  sizes.push(['160', '600'])

  //@ts-ignore
  window['nitroAds'].createAd(RIGHT_GUTTER_ID, {
    ...NitroPayConfig,
    "format": "sticky-stack",
    "stickyStackLimit": 15,
    "stickyStackSpace": 1.5,
    "sizes": sizes,
    "report": {
      "enabled": true,
      "icon": true,
      "wording": "Report Ad",
      "position": "top-right"
    },
    "mediaQuery": "(min-width: 900px)"
  })
}

function resizeListener(w: Window, event: UIEvent) {
  const currentWidth = window.innerWidth
  if (!Number.isNaN(previousWidth)) {
    if (
      (previousWidth > currentWidth && currentWidth < GUTTER_BREAKPOINT && previousWidth >= GUTTER_BREAKPOINT) // Shrinking, passed breakpoint
      || (previousWidth < currentWidth && currentWidth >= GUTTER_BREAKPOINT && previousWidth < GUTTER_BREAKPOINT) // Growing, passed breakpoint
    ) {
      console.log('createStickyStackAD()', previousWidth, currentWidth)
      createStickyStackAd(w)
    } else if (
      (previousWidth > currentWidth && currentWidth < ANCHOR_BREAKPOINT && previousWidth >= ANCHOR_BREAKPOINT) // shrinking
    ) {
      const rightGutterElement = document.getElementById(RIGHT_GUTTER_ID)
      if (rightGutterElement) rightGutterElement.innerHTML = ''

    } else if (
      (previousWidth < currentWidth && currentWidth >= ANCHOR_BREAKPOINT && previousWidth < ANCHOR_BREAKPOINT) // growing
    ) {
      createStickyStackAd(w)
    }
  }

  previousWidth = currentWidth
}

export default function PageLayout({ children }: { children: React.ReactNode }) {
  // TODO: Handle search
  // const [search, setSearch] = useState(useLocation().search)
  const search = ''

  useEffect(() => {
    createBottomAnchorAd(window)
    window.addEventListener('resize', (event: UIEvent) => { resizeListener(window, event) })
  }, [])

  useEffect(() => {
    createStickyStackAd(window)
  })

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
      paddingTop: '6em',
      [theme.breakpoints.up('xl')]: {
        minWidth: '340px',
      },
      [theme.breakpoints.between('lg', 'md')]: {
        minWidth: '240px',
      },
      [theme.breakpoints.down('md')]: {
        minWidth: '0px',
        display: 'none'
      }
    },
    layout: {
      display: 'flex',
      flexDirection: 'row',
    },
    app: {
      textAlign: 'left',
      padding: '10px',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      [theme.breakpoints.up('xl')]: {
        marginLeft: '50px',
        marginRight: '50px'
      },
      [theme.breakpoints.only('lg')]: {
        marginLeft: '25px',
        marginRight: '25px'
      },
      [theme.breakpoints.only('md')]: {
        marginLeft: '5px',
        marginRight: '5px'
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '0px'
      },
    }
  })

  const classes = styles(theme)
  return (
    <>
      <div className="background-color"></div>
      <div className="background-image"></div>

      <NavBar />

      <Box sx={classes.layout}>
        <Box sx={classes.app}>
          {children}
        </Box>
        <Box id={RIGHT_GUTTER_ID} sx={classes.gutter} />
      </Box>

      <Box sx={classes.section}>
        <Typography variant={'h2'}>Reporting A Bug</Typography>
        If you found a bug or have a suggestion, report it in the <Link href="https://www.reddit.com/user/enigma_0Z/comments/zfk3bz/pokemon_scarlet_violet_sandwich_calculator_bug/" target='_blank' rel="noreferrer">official reddit thread</Link>
      </Box>
      <Box sx={classes.section}>
        <DomLink href="https://www.youtube.com/channel/UCMVAWJUY88YlJlX88B0siDQ">YouTube</DomLink> |&nbsp;
        <DomLink href="https://twitter.com/enigma_0z">Twitter</DomLink> |&nbsp;
        <DomLink href="https://discord.gg/Wyemk6G28z">Discord</DomLink> |&nbsp;
        <DomLink href="https://www.patreon.com/enigmaplaysgames">Patreon</DomLink> |&nbsp;
        <DomLink href="https://enigma-plays-live.myspreadshop.com/">Merch</DomLink>
      </Box>
      <Box sx={classes.section}>
        <img style={{ width: '80%', imageRendering: 'pixelated' }} src='/img/logo.png' alt="enigma! logo" />
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