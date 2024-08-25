const jwt = require('jsonwebtoken');
const {Employee} = require('../models');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract token
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify token
   // console.log("decode -> ",decoded);
    req.user = await Employee.findById(decoded.id); // Attach user to request
    //console.log("user",req.user);
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: true });
  }
};

module.exports = authMiddleware;
