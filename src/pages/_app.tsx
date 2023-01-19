import './index.css';
import './layout.css';
import '@/components/modal/LoginModal.css';
import '@/components/Sandwich.css';
import './Recipes/index.css'

import themeOptions from '@/res/theme'

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

import PageLayout from '../components/layout/PageLayout';
import { NextPage } from 'next/types';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_WGVEKdijj',
    userPoolWebClientId: '49p7d8fiat39thb876s0o7cnht',
    signUpVerificationMethod: 'link',
  }
})

export default function App({ Component }: { Component: NextPage }) {
  const theme = createTheme(themeOptions)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageLayout>
        <Component />
      </PageLayout>
    </ThemeProvider>
  )
}