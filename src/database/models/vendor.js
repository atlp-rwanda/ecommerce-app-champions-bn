const { Model } = require("sequelize");

const { v4: uuidv4 } = require("uuid");

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
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      businessName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      businessAddress: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      accountNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      taxIdNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      typeOfProducts: {
        type: DataTypes.STRING,
        allowNull: false
      },
      preferredCurency: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postalCode: {
        type: DataTypes.INTEGER,
        allowNull: false
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
