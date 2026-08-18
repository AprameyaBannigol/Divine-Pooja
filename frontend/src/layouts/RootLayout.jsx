import React from 'react';
import { Outlet } from 'react-router-dom';
import ToastProvider from '../components/feedback/ToastContext.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

const RootLayout = () => {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-stone-50/50 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default RootLayout;
