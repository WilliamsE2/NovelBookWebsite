import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

// Pages
import Layout from './pages/Layout';
import Home from './pages/Home';
import MyBookshelf from './pages/MyBookshelf';
import Account from './pages/Account';
import NoPage404 from './pages/NoPage404';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mybookshelf" element={<MyBookshelf />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<NoPage404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
