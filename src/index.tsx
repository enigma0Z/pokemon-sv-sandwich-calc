import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './pages/Layout';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore';
import Recipes from './pages/Recipes';
import HomeV2 from './pages/HomeV2'
import './res/theme'
import About from './pages/About';
import FAQ from './pages/FAQ';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from './res/theme';
import './auth/AWSEventListener';
import './util/NitroPay';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomeV2 />} />
            <Route path="explore" element={<Explore />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
