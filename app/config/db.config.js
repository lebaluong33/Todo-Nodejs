const password = require('./password.js');

module.exports = {
    HOST: "localhost",
    USER: "luong",
    PASSWORD: password.password,
    DB: "todo",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };