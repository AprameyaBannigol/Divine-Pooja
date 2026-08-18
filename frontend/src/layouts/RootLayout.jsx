import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RootLayout = () => {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md font-medium transition-colors ${
      isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-indigo-600">Divine Pooja</span>
          </div>
          <nav className="flex space-x-2">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/poojas" className={linkClass}>
              Poojas
            </NavLink>
            <NavLink to="/priests" className={linkClass}>
              Priests
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Divine Pooja Booking. Phase 1 Setup.
      </footer>
    </div>
  );
};

export default RootLayout;
