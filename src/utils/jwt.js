const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};

module.exports = {
  generateToken,
  extractToken,
  verifyToken,
};
