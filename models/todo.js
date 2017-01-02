'use strict';
module.exports = function (sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function (models) {
        Todo.belongsTo(models.User, {
          onDelete: 'cascade'
        })
      }
    }
  });
  return Todo;
};