import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Flame, Menu, X, User, LogOut, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../feedback/ToastContext.jsx';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Poojas', path: '/poojas' },
    { name: 'Priests', path: '/priests' },
    { name: 'Muhurta', path: '/muhurta' },
    { name: 'Temples', path: '/temples' },
    { name: 'Blog', path: '/blog' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      addToast('Signed out successfully', 'info');
      setIsMobileMenuOpen(false);
      navigate('/', { replace: true });
    } catch {
      addToast('Logout failed', 'error');
    }
  };

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

          {/* User Auth Action Controls */}
          <div className="hidden sm:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/account"
                  className="flex items-center gap-2 bg-stone-100 hover:bg-amber-50 text-stone-800 hover:text-amber-800 px-3 py-1.5 rounded-xl transition-all border border-stone-200 text-xs font-semibold"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs font-serif">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span>{user.name?.split(' ')[0]}</span>
                  {user.role !== 'USER' && (
                    <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 py-0.2 rounded uppercase font-bold">
                      {user.role}
                    </span>
                  )}
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-3.5 h-3.5" />}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" leftIcon={<User className="w-4 h-4" />}>
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
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
            {isAuthenticated && user ? (
              <>
                <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" fullWidth leftIcon={<ShieldCheck className="w-4 h-4 text-amber-600" />}>
                    Account ({user.name})
                  </Button>
                </Link>
                <Button variant="primary" size="md" fullWidth onClick={handleLogout} leftIcon={<LogOut className="w-4 h-4" />}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" fullWidth leftIcon={<User className="w-4 h-4" />}>
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" fullWidth>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
