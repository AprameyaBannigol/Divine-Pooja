import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Flame, Menu, X, Search, User } from 'lucide-react';
import Button from '../ui/Button.jsx';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Poojas', path: '/poojas' },
    { name: 'Priests', path: '/priests' },
    { name: 'Muhurta', path: '/muhurta' },
    { name: 'Temples', path: '/temples' },
    { name: 'Blog', path: '/blog' },
  ];

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
      isActive
        ? 'text-amber-700 font-semibold bg-amber-50'
        : 'text-stone-700 hover:text-amber-700 hover:bg-amber-50/50'
    }`;

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 fill-amber-200 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-stone-900 leading-none tracking-tight">
                Divine Pooja
              </span>
              <span className="text-[10px] uppercase font-semibold text-amber-700 tracking-widest mt-0.5">
                Authentic Rituals
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.name} to={item.path} className={linkClass}>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Placeholders (Search & Book) */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              type="button"
              className="p-2 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Button variant="outline" size="sm" leftIcon={<User className="w-4 h-4" />}>
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Book Pooja
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={linkClass}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="pt-4 border-t border-stone-100 flex flex-col gap-2.5">
            <Button variant="outline" size="md" fullWidth leftIcon={<User className="w-4 h-4" />}>
              Sign In
            </Button>
            <Button variant="primary" size="md" fullWidth>
              Book Pooja
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
