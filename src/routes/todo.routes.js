const validate = require('./../middlewares/validate.js');
const TodoValidation = require('../validations/todo.validation.js');
module.exports = (app) => {
  const todoController = require('../controllers/todo.controller.js');

  var router = require('express').Router();

  // get all todo
  router.get('/', todoController.getAllTodos);

  // Create a new todo
  router.post(
    '/',
    validate(TodoValidation.createTodo),
    todoController.createTodo
  );

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

  // Retrieve all completed todos
  router.get('/completed-todos', todoController.findAllCompleted);

  // Delete all completed todos
  router.delete('/completed-todos', todoController.deleteAllCompleted);

  // Retrieve all uncompleted todos
  router.get('/active-todos', todoController.findAllActive);

  app.use('/todos', router);
};
