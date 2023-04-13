const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "BuyerId", onDelete: "CASCADE", onUpdate: "CASCADE" });
      Order.hasMany(models.Sale, { foreignKey: "OrderId", onDelete: "CASCADE", onUpdate: "CASCADE" });
    }
  }
  Order.init(
    {
      BuyerId: {
        type: DataTypes.INTEGER,
      },
      orderTotal: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: "created"
      },
      paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: "pending"
      }
    },
    {
      sequelize,
      modelName: "Order"
    }
  );
  return Order;
};
