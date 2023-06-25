const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');


// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {

    console.log('hit')
    // allows token to be sent via  req.query or headers
    const authorizationHeader = req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (!authorizationHeader) {
      throw new AuthenticationError('You have no token!')
    }

   const token = authorizationHeader.replace('Bearer ', '');

   if (!token) {
    throw new AuthenticationError('You have no token!')
   }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
