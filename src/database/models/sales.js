const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    static associate(models) {
      Sale.belongsTo(models.Order, { foreignKey: "OrderId", onDelete: "CASCADE", onUpdate: "CASCADE" });
      Sale.belongsTo(models.Product, { foreignKey: "ProductId", onDelete: "CASCADE", onUpdate: "CASCADE" });
      Sale.belongsTo(models.Vendor, { foreignKey: "VendorId", onDelete: "CASCADE", onUpdate: "CASCADE" });
    }
  }
  Sale.init(
    {
      OrderId: {
        type: DataTypes.INTEGER,
      },
      ProductId: {
        type: DataTypes.INTEGER,
      },
      VendorId: {
        type: DataTypes.INTEGER
      },
      Status: {
        type: DataTypes.STRING,
        defaultValue: "created"
      },
      Quantity: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Sale"
    }
  );
  return Sale;
};
