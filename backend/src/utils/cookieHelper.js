import jwt from 'jsonwebtoken';

export const COOKIE_NAME = 'divine_pooja_token';

export const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is missing in server configuration');
  }
  return jwt.sign({ userId }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  };
};

export const sendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);
  const cookieOptions = getCookieOptions();

  res.cookie(COOKIE_NAME, token, cookieOptions);

  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    role: user.role,
    profileImage: user.profileImage || '',
    isActive: user.isActive,
    createdAt: user.createdAt,
  };

  return res.status(statusCode).json({
    success: true,
    message,
    data: safeUser,
  });
};

export const clearTokenCookie = (res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie(COOKIE_NAME, '', {
    httpOnly: true,
    expires: new Date(0),
    maxAge: 0,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });
};
