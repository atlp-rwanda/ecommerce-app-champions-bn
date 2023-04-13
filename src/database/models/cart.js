const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
   
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'BuyerId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  Cart.init( 
    {
      BuyerId: {
        type: DataTypes.INTEGER,
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      total: DataTypes.FLOAT,
    },
    {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};