'use client';

import NextLink from 'next/link'
import { AppBar, Box, Button, Divider, Drawer, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"
import res from "../../res"
import { subscribeAuthEvent } from '../../auth/AWSEventListener'
import { useState } from 'react'

import { Menu } from '@mui/icons-material';
import FeatureFlags from '../../util/FeatureFlags'
import { LoginModal } from '../modal/LoginModal'

export default function NavBar() {
  // TODO: Get this from window location + useState or useEffect
  const search=''

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  subscribeAuthEvent('Layout.tsx', ['configured', 'signIn', 'signOut', 'autoSignIn'], (user) => {
    if (user !== null && user !== undefined) setLoggedIn(true)
    else setLoggedIn(false)
  })

  return (
    <>
      <AppBar position="relative">
        <Toolbar sx={{ background: res.palette.gradients.bar }}>
          <Box margin={'.5em'}>
            <Typography variant="h3" textAlign={'center'}>
              Sandwich Calculator
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            <nav>
              <Button size='small' component={NextLink} href={`/${search}`}>Home</Button>
              <Button size='small' component={NextLink} href={`/Explore${search}`}>Ingredients</Button>
              <Button size='small' component={NextLink} href={`/Recipes${search}`}>Recipes</Button>
              <Button size='small' component={NextLink} href={`/FAQ${search}`}>FAQ</Button>
              <Button size='small' component={NextLink} href={`/About${search}`}>About</Button>
            </nav>
          </Box>
          <Box flex={1} />
          <Button
            color="inherit"
            aria-label="open drawer"
            onClick={() => { setDrawerOpen(true) }}
            sx={{ display: { md: 'none' } }}
          >
            Menu &nbsp;
            <Menu/>
          </Button>
          <Button
            disabled={FeatureFlags.login === false}
            size='small'
            sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
            onClick={() => setLoginModalOpen(true)}
          >
            {loggedIn ? 'Log out' : 'Log in'}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor='right'
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false) }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <List>
          {
            [
              { label: 'Home', path: '/' },
              { label: 'Ingredients', path: '/Explore' },
              { label: 'Recipes', path: '/Recipes' },
              { label: 'FAQ', path: '/FAQ' },
              { label: 'About', path: 'About' }
            ].map(v => (
              <ListItemButton
                component={NextLink}
                href={v.path + search}
                key={JSON.stringify(v)}
                onClick={() => { setDrawerOpen(false) }}
              >
                <ListItemText>
                  <Typography variant='button'>
                    {v.label}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            ))
          }
          <Divider />
          <ListItemButton disabled={FeatureFlags.login === false} onClick={() => setLoginModalOpen(true)}>
            <ListItemText>
              <Typography variant='button'>
                {loggedIn ? 'Log out' : 'Log in'}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <LoginModal
        open={loginModalOpen}
        onClose={() => { setLoginModalOpen(false) }}
      />
    </>
  )
}