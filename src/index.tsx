import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Layout from './pages/Layout';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore';
import Recipes from './pages/Recipes';
import Bugs from './pages/Bugs';
import HomeV2 from './pages/HomeV2'
import './res/theme'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomeV2 />} />
            <Route path="explore" element={<Explore />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="bugs" element={<Bugs />} />
            <Route path="old" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
