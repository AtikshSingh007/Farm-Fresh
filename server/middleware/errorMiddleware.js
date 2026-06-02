/**
 * Centralized Error-Handling Middleware.
 * Catches all controller errors and returns standardized JSON payloads.
 */

// Route not found handler
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global error handler
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle MongoDB connection/buffering timeout errors
  if (err.message && (err.message.includes('buffering timed out') || err.message.includes('ECONNREFUSED'))) {
    statusCode = 503;
    message = '❌ Database not connected. Please set up MongoDB to use authentication features. See MONGODB_ATLAS_SETUP.md for setup instructions (5 minutes, FREE).';
  }

  // Handle Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = 'Resource not found: invalid ID format';
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  // Handle Mongoose Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate field value entered: ${field} already exists`;
  }

  // Send structured error response
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};
