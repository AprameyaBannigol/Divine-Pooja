import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import PoojasPage from '../pages/PoojasPage.jsx';
import PriestsPage from '../pages/PriestsPage.jsx';
import MuhurtaPage from '../pages/MuhurtaPage.jsx';
import TemplesPage from '../pages/TemplesPage.jsx';
import BlogsPage from '../pages/BlogsPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="poojas" element={<PoojasPage />} />
        <Route path="priests" element={<PriestsPage />} />
        <Route path="muhurta" element={<MuhurtaPage />} />
        <Route path="temples" element={<TemplesPage />} />
        <Route path="blog" element={<BlogsPage />} />
        <Route path="blogs" element={<BlogsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
