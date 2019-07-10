const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // req.user = decoded.user;
        req.user = await User.findOne({ _id: decoded.user.id }); 

        if (!req.user) {
          return res.status(401).json({ msg: 'Token is not valid'});
        }

        next();
      } catch (err) {
        console.log(err);
        res.status(401).json({ msg: 'Token is not valid' });
      }
};