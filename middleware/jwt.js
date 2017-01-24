require('dotenv').config()

const jwt = require('restify-jwt');
const JWT_SECRET = process.env.JWT_SECRET

module.exports = jwt({ secret: JWT_SECRET }).unless({
  path: ['/login','/signup'],
  getToken: function fromHeaderOrQuerystring (req) {
    if (
      req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    }

    return null;
  }
});
