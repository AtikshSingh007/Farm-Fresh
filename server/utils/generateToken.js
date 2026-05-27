import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_jwt_passkey_change_in_production', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

export default generateToken;
