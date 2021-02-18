const router = require('express').Router();
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger/todo.swagger.json');
module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/api/v1', router);
};
