const db = require('../models');
const Todo = db.todos;
// const Op = db.Sequelize.Op;

// Get all todos
exports.getAllTodos = (req, res) => {
  Todo.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the todo.',
      });
    });
};

// Create and Save a new todo
exports.create = (req, res) => {
  // Validate request
  console.log('req:   ', req);
  if (!req.body.value) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a todo
  const todo = {
    isCompleted: req.body.isCompleted ? req.body.isCompleted : false,
    value: req.body.value,
  };

  // Save todo in the database
  Todo.create(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the todo.',
      });
    });
};

// Update a todo by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Todo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Todo was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Todo with id=' + id,
      });
    });
};

// Delete a todo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Todo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'Todo was deleted successfully!',
        });
      } else {
        send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Todo with id=' + id,
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
      res.send({
        message: `${nums} Completed todos were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Todos.',
      });
    });
};

// Find all completed todos
exports.findAllCompleted = (req, res) => {
  Todo.findAll({ where: { isCompleted: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Todos.',
      });
    });
};

// Find all active todos
exports.findAllActive = (req, res) => {
  Todo.findAll({ where: { isCompleted: false } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Todos.',
      });
    });
};
