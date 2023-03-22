

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Product.belongsTo(models.Vendor, {
        foreignKey: 'vendorId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Product.init({
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false
      
    },
    vendorId: {
      type: DataTypes.INTEGER,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    categoryId: {
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
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true
  });
  return Product;
};