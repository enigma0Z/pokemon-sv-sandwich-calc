import { Authenticator, ThemeProvider, Theme } from '@aws-amplify/ui-react';
import { Box, Button, Modal, Paper, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { subscribeAuthEvent } from '../../auth/AWSEventListener';
import './LoginModal.css'

export function LoginModal(props: {open: boolean, onClose: () => void}) {
  const [open, setOpen] = useState(props.open)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => { // Watch open prop to set state
    setOpen(props.open)
  }, [props.open])

  subscribeAuthEvent('LoginModal.tsx', ['configured', 'signIn', 'signOut'], (user) => {
    setUserEmail(user?.attributes.email)
  })

  const theme = useTheme();

  const amplifyTheme: Theme = {
    name: 'Auth Example Theme',
    tokens: {
      colors: {
        background: {
          primary: {
            value: 'transparent'
          },
          secondary: {
            value: '#404040'
          },
        },
        font: {
          primary: { value: 'white' },
          secondary: { value: 'white' },
          active: { value: 'white' },
          focus: { value: 'white' },
          hover: { value: 'red' },
          interactive: { value: '#FF0000A0' },
        },
        brand: {
          primary: {
            '10': '#00000060', // Secondary hover
            '20': '#FFFFFF20', // Secondary click
            '40': 'blue',
            '60': '#FFFFFFFF', // Outline Hover
            '80': '#FFFFFF30',
            '90': '#FFFFFF50', // Main button hover
            '100': '#FFFFFF80',
          },
        },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: theme.palette.action.toString()
              },
            },
            _hover: {
              color: {
                value: theme.palette.common.toString()
              },
            },
            _active: {
              color: {
                value: theme.palette.common.toString()
              },
            },
          },
        },
      },
    },
  };

  return (
    <Modal
      open={open}
      onClose={() => { setOpen(false); if (props.onClose) props.onClose() }}
      sx={{ display: 'flex' }}
    >
      <Paper
        elevation={4}
        sx={{
          margin: 'auto',
          alignSelf: 'center',
          borderRadius: '1em',
          overflow: 'clip'
        }}
      >
        <ThemeProvider theme={amplifyTheme}>
          <Authenticator loginMechanisms={['email']}>
            {({ signOut, user }) => (
              <Box padding='1em'>
                <Typography gutterBottom variant='h3'>Logged in as {userEmail}</Typography>
                <Button fullWidth variant='outlined' onClick={signOut}>Log out</Button>
              </Box>
            )}
          </Authenticator>
        </ThemeProvider>
      </Paper>
    </Modal>
  );
}