import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, phone, password, role, location, preferredLanguage } = req.body;

    // Guard: duplicate phone check
    const userExists = await User.findOne({ phone });
    if (userExists) {
      res.status(400);
      return next(new Error('An account with this phone number already exists.'));
    }

    const user = await User.create({
      name,
      phone,
      password,
      role,
      location: location || { type: 'Point', coordinates: [78.9629, 20.5937], address: '' },
      preferredLanguage,
    });

    res.status(201).json({
      success: true,
      data: {
        id:       user._id,
        name:     user.name,
        phone:    user.phone,
        role:     user.role,
        location: user.location,
        token:    generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & return JWT (Login)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      res.status(400);
      return next(new Error('Please provide both phone number and password.'));
    }

    // Must explicitly select password since schema has select: false
    const user = await User.findOne({ phone }).select('+password');

    if (!user) {
      res.status(401);
      return next(new Error('Invalid phone number or password.'));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401);
      return next(new Error('Invalid phone number or password.'));
    }

    res.json({
      success: true,
      data: {
        id:       user._id,
        name:     user.name,
        phone:    user.phone,
        role:     user.role,
        location: user.location,
        token:    generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently authenticated user's profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    // req.user is already attached by authMiddleware (without password)
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      return next(new Error('User not found.'));
    }

    res.json({
      success: true,
      data: {
        id:                user._id,
        name:              user.name,
        phone:             user.phone,
        role:              user.role,
        location:          user.location,
        preferredLanguage: user.preferredLanguage,
      },
    });
  } catch (error) {
    next(error);
  }
};
