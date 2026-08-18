import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, loginUser, registerUser, logoutUser, updateUserProfile } from '../services/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    try {
      const res = await getCurrentUser();
      if (res.success && res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (credentials) => {
    const res = await loginUser(credentials);
    if (res.success && res.data) {
      setUser(res.data);
      setIsAuthenticated(true);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await registerUser(userData);
    if (res.success && res.data) {
      setUser(res.data);
      setIsAuthenticated(true);
    }
    return res;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (profileData) => {
    const res = await updateUserProfile(profileData);
    if (res.success && res.data) {
      setUser(res.data);
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateProfile,
        refreshUser: checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
