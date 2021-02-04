const password = require('./password.js');

module.exports = {
    HOST: "ec2-3-222-11-129.compute-1.amazonaws.com",
    USER: "ligganldbtgjff",
    PASSWORD: password.password,
    PORT: "5432",
    DB: "db70pgbgskul52",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };