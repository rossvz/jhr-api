var User = require('../models').User
var Todo = require('../models').Todo

module.exports = {
  list(req, res){
    var query = { where: req.query }
    User.findAll(query)
      .then(function (users) {
        var results = {
          message: 'Users list query successful',
          count: users.length,
          users: users
        }
        res.send(results)
      })
      .catch(function (error) {
        res.send(error)
      })
  },
  find(req, res){
    var query = {
      include: req.query.todos ? Todo : false,
      where: {
        id: req.params.id
      }
    }
    User.findOne(query).then(user => {
      res.send({
        message: user ? `User find query successful` : 'No user found',
        user: user || {}
      })
    })
  },
  create(req, res){
    User.create(req.body)
      .then(newUser => {
        res.send({
          message: 'User created successfully',
          user: newUser
        })
      }, err => {
        res.send(err)
      })
  },
  update(req, res) {
    User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(function (updatedUsers) {
        res.send({
          message: `User ${req.params.id} updated`,
          count: updatedUsers
        });
      })
      .catch(function (error) {
        res.send(error);
      });
  },
  delete(req, res) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (deletedUsers) {
        res.send({
          message: `User ${req.params.id} deleted successfully`,
          users: deletedUsers
        });
      })
      .catch(function (error) {
        res.send(error);
      });
  }
}
