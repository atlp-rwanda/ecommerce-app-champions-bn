
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LoggedInUser extends Model {
    static associate(models) {
    
    }
  };
  LoggedInUser.init({
    refreshToken: DataTypes.TEXT,
    user_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'LoggedInUser',
    tableName: 'LoggedInUsers',
  });
  return LoggedInUser;
};