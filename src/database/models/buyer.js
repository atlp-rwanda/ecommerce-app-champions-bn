const { Model } = require("sequelize");
const user = require("./user");

module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    static associate(models) {
      Buyer.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }
  Buyer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      shipingAddress: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
      },
      preferredCurency: {
        type: DataTypes.STRING,
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
      modelName: "Buyer",
      tableName: "buyers",
      timestamps: true
    }
  );
  return Buyer;
};
