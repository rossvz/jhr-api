require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models').User

module.exports = {
  login(req, res){
    const query = {
      where: {
        email: req.body.email,
        password: req.body.password,
      }
    }

    User.findOne(query).then(user => {
      if (user) {
        const token = jsonwebtoken.sign(user.get({ plain: true }), JWT_SECRET);

        res.send({
          message: 'Authentication successful',
          token: token,
        });
      } else {
        res.status(404);
        res.send({
          message: 'Invalid credentials',
        });
      }
    });
  },
}
