



const {
    Model
  } = require('sequelize');
  
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { v4: uuidv4 } = require('uuid');
const user = require('./user');
  
  
  module.exports = (sequelize, DataTypes) => {
    class Buyer extends Model {
      static associate(models) {
        // define association here

        Buyer.belongsTo(models.user,{foreignKey:"userId", onDelete: "CASCADE",
        onUpdate: "CASCADE"});
        
      }
    }
    Buyer.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true
      },
     userId:{
        type:DataTypes.UUID,
        allowNull:false
     },
     shipingAddress:{
        type:DataTypes.JSONB,
        allowNull:false
     },
     paymentMethod:{
        type:DataTypes.STRING,
        allowNull:false
     },
     preferredCurency:{
    type:DataTypes.STRING,
     allowNull:false
    },
     createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'Buyer',
      tableName: 'buyers',
      timestamps: true
    });
    return Buyer;
  };