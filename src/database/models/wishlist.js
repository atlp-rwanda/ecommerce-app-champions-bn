'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishlist extends Model {
    
    static associate(models) {
      
    }
  }
  wishlist.init({
    id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    productPrice: DataTypes.INTEGER,
    productImage: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'wishlist',
  });
  return wishlist;
};