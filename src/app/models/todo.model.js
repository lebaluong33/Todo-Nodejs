module.exports = (sequelize, Sequelize) => {
    const todos = sequelize.define("todos", {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      isCompleted: {
        type: Sequelize.BOOLEAN
      },
      value: {
        type: Sequelize.STRING
      }
    });
  
    return todos;
  };