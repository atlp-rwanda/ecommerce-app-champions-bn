
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChatUser extends Model {
    static associate(models) {
      // define association here
    }
  }
  ChatUser.init({
    username: DataTypes.STRING,
    socketId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChatUser',
  });
  return ChatUser;
};