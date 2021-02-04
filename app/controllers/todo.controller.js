const db = require('../models');
const Todo = db.todos;
const Op = db.Sequelize.Op;

// Create and Save a new todo
exports.create = (req, res) => {
  // Validate request
  console.log('req:   ', req);
  if (!req.query.value) {
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

// Retrieve all todos from the database.
exports.findAll = (req, res) => {
  const value = req.query.value;
  var condition = value ? { value: { [Op.like]: `%${value}%` } } : null;

  Todo.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Todos.',
      });
    });
};

// Find a single todo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Todo with id=' + id,
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

// Delete all todos from the database.
exports.deleteAll = (req, res) => {
  Todo.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Todos were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Todos.',
      });
    });
};
// Find all published todos
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
