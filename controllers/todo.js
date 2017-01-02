var Todo = require('../models').Todo

module.exports = {
  list(req, res){
    var query = { where: req.query }
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
        id: req.params.id
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
    Todo.create(req.body)
      .then(newTodo => {
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
        id: req.params.id
      }
    })
      .then(function (updatedTodos) {
        res.send({
          message: `Todo ${req.params.id} updated`,
          count: updatedTodos
        });
      })
      .catch(function (error) {
        res.send(error);
      });
  },
  delete(req, res) {
    Todo.destroy({
      where: {
        id: req.params.id
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