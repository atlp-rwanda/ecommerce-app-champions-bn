const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    static associate(models) {
      // define association here
      Vendor.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }
  Vendor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      birthDate:{
        type:DataTypes.JSONB,
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
    },
    {
      sequelize,
      modelName: "Vendor",
      tableName: "vendors",
      timestamps: true
    }
  );
  return Vendor;
};
