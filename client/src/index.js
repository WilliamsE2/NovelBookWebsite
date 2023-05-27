import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './pages/Layout';
import Home from './pages/Home';
import MyBookshelf from './pages/MyBookshelf';
import Discover from './pages/Discover';
import Book from './pages/Book';
import Account from './pages/Account';
import EditAccount from './pages/EditAccount';
import NoPage404 from './pages/NoPage404';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="layout" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mybookshelf" element={<MyBookshelf />} />
          <Route path="discover" element={<Discover />} />
          <Route path="book" element={<Book />} />
          <Route path="account" element={<Account />} />
          <Route path="editaccount" element={<EditAccount />} />
          <Route path="*" element={<NoPage404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
