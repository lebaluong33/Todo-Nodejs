module.exports = (sequelize, Sequelize) => {
    const todos = sequelize.define("todos", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      isCompleted: {
        type: Sequelize.BOOLEAN
      },
      value: {
        type: Sequelize.STRING(10000)
      }
    });
  
    return todos;
  };