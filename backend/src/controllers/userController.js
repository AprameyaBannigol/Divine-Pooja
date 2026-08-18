import User from '../models/User.js';

export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, profileImage } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found',
      });
    }

    if (name !== undefined) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (profileImage !== undefined) user.profileImage = profileImage;

    // Strict boundary: Never allow updating role, email, passwordHash, or isActive via profile update
    const updatedUser = await user.save();

    const safeUser = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone || '',
      role: updatedUser.role,
      profileImage: updatedUser.profileImage || '',
      isActive: updatedUser.isActive,
      createdAt: updatedUser.createdAt,
    };

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
};
