const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to check if user is admin
exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      throw new Error('Authorization token not found');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log({decoded})
    const user = await User.findById(decoded._id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized Token' });
  }
};

