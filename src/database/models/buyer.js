const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    static associate(models) {
      // define association here
      Buyer.belongsTo(models.User, {
        foreignKey: "UserId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      Buyer.hasMany(models.Wishlist, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    Buyer.hasMany(models.Cart, {
      foreignKey: 'buyerId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  } 
  }
  Buyer.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
    birthDate:{
      type:DataTypes.JSONB,
     },
     gender:{
      type:DataTypes.JSONB,
   },
    shipingAddress: {
      type: DataTypes.JSONB,
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
    preferredCurency: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
  
    },
    city: {
      type: DataTypes.STRING,
     
    },
    postalCode: {
      type: DataTypes.INTEGER,
     
    }, 
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Buyer',
  });
  return Buyer;
};