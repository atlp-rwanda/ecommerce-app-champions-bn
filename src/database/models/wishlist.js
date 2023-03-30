'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    
    static associate(models) {

      Wishlist.belongsTo(models.Buyer, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // Wishlist.belongsTo(models.Product, {
      //   foreignKey: 'productId',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
      
    }
  }
  Wishlist.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    products: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    }

  }, {
    sequelize,
    modelName: 'Wishlist',
    tableName: 'wishlists'
  });
  return Wishlist;
};