module.exports = (app) => {
  const todos = require('../controllers/todo.controller.js');

  var router = require('express').Router();

  // get all todo
  router.get('/', todos.getAllTodos);

  // Create a new todo
  router.post('/', todos.create);

  // Retrieve all published todos
  router.get('/completed-todos', todos.findAllCompleted);

  // Update a todo with id
  router.put('/{id}', todos.update);

  // Delete a todo with id
  router.delete('/{id}', todos.delete);

  // Delete all completed todos
  router.delete('/completed-todos', todos.deleteAllCompleted);

  app.use('/todos', router);
};
