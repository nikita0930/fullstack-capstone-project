import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import SearchPage from './components/SearchPage/SearchPage';   // ✅ ADD THIS

import Navbar from './components/Navbar/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Routes */}
        <Route path="/" element={<MainPage />} />
        <Route path="/app" element={<MainPage />} />

        {/* Auth Routes */}
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/register" element={<RegisterPage />} />

        {/* Search Route */}
        <Route path="/app/search" element={<SearchPage />} />
      </Routes>

    </>
  );
}

export default App;
