const Joi = require('joi');

const createTodo = {
  body: Joi.object().keys({
    value: Joi.string().required(),
    isCompleted: Joi.boolean().required(),
  }),
};

const getTodo = {
  params: Joi.object().keys({
    id: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

const updateTodo = {
  params: Joi.object().keys({
    id: Joi.string().guid({ version: 'uuidv4' }),
  }),
  body: Joi.object().keys({
    id: Joi.string().guid({ version: 'uuidv4' }),
    value: Joi.string().required(),
    isCompleted: Joi.boolean(),
  }),
};

const deleteTodo = {
  params: Joi.object().keys({
    id: Joi.string().guid({ version: 'uuidv4' }),
  }),
};

module.exports = {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
