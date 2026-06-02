import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * protect — verifies the JWT from the Authorization header
 * and attaches the user document (sans password) to req.user.
 */
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    return next(new Error('Not authorized — no token provided.'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'farm_fresh_super_secret_key_change_in_production_2024'
    );

    // Attach user to request (password excluded via select:false on schema)
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      res.status(401);
      return next(new Error('Not authorized — user no longer exists.'));
    }

    next();
  } catch (err) {
    res.status(401);
    next(new Error('Not authorized — token invalid or expired.'));
  }
};

/**
 * authorize — role-based access control middleware.
 * Usage: authorize('farmer'), authorize('admin', 'farmer')
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      return next(
        new Error(
          `Access denied — role '${req.user?.role ?? 'unknown'}' cannot access this resource.`
        )
      );
    }
    next();
  };
};
