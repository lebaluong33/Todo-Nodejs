const db = require('../models');
const Todo = db.todos;
// const Op = db.Sequelize.Op;

// Get all todos
exports.getAllTodos = (req, res) => {
  Todo.findAll({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || 'Some error occurred while creating the todo.',
      });
    });
};

// Create and Save a new todo
exports.createTodo = (req, res) => {
  // Create a todo
  const todo = {
    isCompleted: req.body.isCompleted,
    value: req.body.value,
  };

  // Save todo in the database
  Todo.create(todo)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || 'Some error occurred while creating the todo.',
      });
    });
};

// Update a todo by the id in the request
exports.updateTodo = (req, res) => {
  const id = req.params.id;

  Todo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num.length) {
        res.status(200).send({
          message: 'Todo was updated successfully.',
        });
      } else {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: 'Error updating Todo with id=' + id,
      });
    });
};

// Delete a todo with the specified id in the request
exports.deleteTodo = (req, res) => {
  const id = req.params.id;
  Todo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.status(204).send({
          message: 'Todo was deleted successfully!',
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: 'Could not delete Todo with id=' + id,
      });
    });
};

// Find all completed todos
exports.findAllCompleted = (req, res) => {
  Todo.findAll({ where: { isCompleted: true } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || 'Todos not found.',
      });
    });
};

//delete all completed todos
exports.deleteAllCompleted = (req, res) => {
  Todo.destroy({
    where: { where: { isCompleted: true } },
    truncate: false,
  })
    .then((nums) => {
      res.status(204).send({
        message: `${nums} Completed todos were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || 'Could not delete Todos.',
      });
    });
};

// Find all active todos
exports.findAllActive = (req, res) => {
  Todo.findAll({ where: { isCompleted: false } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || 'Some error occurred while retrieving Todos.',
      });
    });
};
