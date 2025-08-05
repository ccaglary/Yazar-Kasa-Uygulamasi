import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import PosPage from './pages/PosPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <nav className="main-nav">
        {/* NavLink, aktif linke özel stil vermemizi sağlar */}
        <NavLink to="/">Kasa Ekranı</NavLink>
        <NavLink to="/admin">Admin Paneli</NavLink>
      </nav>
      
      {/* Routes artık kalan tüm alanı dolduracak */}
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<PosPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;