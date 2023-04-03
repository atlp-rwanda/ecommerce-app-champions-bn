const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      Product.belongsTo(models.Vendor, {
        foreignKey: 'VendorId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      // Product.hasMany(models.Wishlist, {
      //   foreignKey: 'productId',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });

      Product.hasMany(models.Review, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Product.belongsTo(models.Category,{foreignKey:"CategoryId"});
    }
  }
  Product.init({
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false
      
    },
    VendorId: {
      type: DataTypes.INTEGER,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
    },
    productImage:{
    type: DataTypes.ARRAY(DataTypes.STRING),

    },
    productPrice: {
      type: DataTypes.DOUBLE,
      allowNull:false,
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1,
    },
    available:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false,
    },
    productDescription:{
      type: DataTypes.STRING,
    },
    productOwner:{
     type: DataTypes.STRING,
     allowNull:false
    },
    expiredDate:{
      type: DataTypes.DATE,
      allowNull:false
    }
    ,
    expired:{
    type: DataTypes.BOOLEAN,
    defaultValue:false,
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
    modelName: 'Product',
  });
  return Product;
};