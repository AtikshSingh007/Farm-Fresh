import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, phone, password, role, location, preferredLanguage } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ phone });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists with this phone number');
    }

    // Create user
    const user = await User.create({
      name,
      phone,
      password,
      role,
      location,
      preferredLanguage,
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          role: user.role,
          location: user.location,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    // Find user
    const user = await User.findOne({ phone });

    // Check password
    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          role: user.role,
          location: user.location,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401);
      throw new Error('Invalid phone number or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          role: user.role,
          location: user.location,
          preferredLanguage: user.preferredLanguage,
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};
