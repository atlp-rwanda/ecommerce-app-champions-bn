const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    static associate(models) {
      // define association here
      Vendor.belongsTo(models.User, {
        foreignKey: "UserId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      Vendor.hasMany(models.ReportedActivity);
      Vendor.hasMany(models.Product, {
        foreignKey: 'VendorId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Vendor.hasMany(models.CouponCodeDiscount,{
        foreignKey:'VendorId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      });
    }
  }
  Vendor.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
    birthDate:{
      type:DataTypes.DATE,
     },
     gender:{
      type:DataTypes.JSONB,
   },
    businessName: {
      type: DataTypes.STRING,
    },
    businessAddress: {
      type: DataTypes.JSONB,
    },
    accountNumber: {
      type: DataTypes.INTEGER,
    },
    taxIdNumber: {
      type: DataTypes.INTEGER,
    },
    typeOfProducts: {
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
    modelName: 'Vendor',
  });
  return Vendor;
};