const validate = require('./../middlewares/validate.js');
const TodoValidation = require('../validations/todo.validation.js');
module.exports = (app) => {
  const todoController = require('../controllers/todo.controller.js');

  var router = require('express').Router();

  // get all todo
  router.get('/', todoController.getAllTodos);

  // get a todo
  router.get('/', validate(TodoValidation.getTodo), todoController.findOne);

  // Create a new todo
  router.post(
    '/',
    validate(TodoValidation.createTodo),
    todoController.createTodo
  );

  // Retrieve all published todos
  router.get('/completed-todos', todoController.findAllCompleted);

  // Update a todo with id
  router.put(
    '/:id',
    validate(TodoValidation.updateTodo),
    todoController.updateTodo
  );

  // Delete a todo with id
  router.delete(
    '/:id',
    validate(TodoValidation.deleteTodo),
    todoController.deleteTodo
  );

  // Delete all completed todos
  router.delete('/completed-todos', todoController.deleteAllCompleted);

  app.use('/todos', router);
};
