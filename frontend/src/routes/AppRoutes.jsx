import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import PoojasPage from '../pages/PoojasPage.jsx';
import PriestsPage from '../pages/PriestsPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="poojas" element={<PoojasPage />} />
        <Route path="priests" element={<PriestsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
