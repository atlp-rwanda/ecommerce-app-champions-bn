
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.belongsTo(models.User,{foreignKey:"userId", onDelete: 'CASCADE',
      onUpdate: 'CASCADE'});
    }
  }
  Chat.init({
     id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false
      
    },
    message:{
      type: DataTypes.STRING,
      allowNull: true,
  
    }
    ,
    userId:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' }
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};