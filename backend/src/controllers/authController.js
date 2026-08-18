import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { sendTokenResponse, clearTokenCookie } from '../utils/cookieHelper.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please log in instead.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // CRITICAL SECURITY RULE: Public registration ALWAYS enforces role = 'USER'
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : '',
      passwordHash,
      role: 'USER',
      isActive: true,
    });

    sendTokenResponse(newUser, 201, res, 'Account created successfully');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    sendTokenResponse(user, 200, res, 'Logged in successfully');
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  clearTokenCookie(res);
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};
