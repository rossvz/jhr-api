var Todo = require('../models').Todo

module.exports = {
  list(req, res){
    const query = {
      where: Object.assign({}, req.query, {
        UserId: req.user.id,
      }),
    };

    Todo.findAll(query)
      .then(function (todos) {
        var results = {
          message: 'Todo list query successful',
          count: todos.length,
          todos: todos
        }
        res.send(results)
      })
      .catch(function (error) {
        res.send(error)
      })
  },
  find(req, res){
    var query = {
      where: {
        id: req.params.id,
        UserId: req.user.id,
      }
    }
    Todo.findOne(query).then(todo => {
      res.send({
        message: todo ? `Todo find query successful` : 'No todo found',
        todo: todo ? todo : {}
      })
    })
  },
  create(req, res){
    Todo.create(Object.assign({}, req.body, {
      UserId: req.user.id,
    })).then(newTodo => {
        res.send({
          message: 'Todo created successfully',
          todo: newTodo
        })
      }, err => {
        res.send(err)
      })
  },
  update(req, res) {
    Todo.update(req.body, {
      where: {
        id: req.params.id,
        UserId: req.user.id,
      }
    }).then(function (updatedTodos) {
        res.send({
          message: `Todo ${req.params.id} updated`,
          count: updatedTodos,
          todo: req.body
        });
      })
      .catch(function (error) {
        res.send(error);
      });
  },
  delete(req, res) {
    Todo.destroy({
      where: {
        id: req.params.id,
        UserId: req.user.id,
      }
    })
      .then(function (deletedTodos) {
        res.send({
          message: `Todo ${req.params.id} deleted successfully`,
          todos: deletedTodos
        });
      })
      .catch(function (error) {
        res.send(error);
      });
  }
}
