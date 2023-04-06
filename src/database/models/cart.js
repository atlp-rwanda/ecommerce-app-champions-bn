const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
   
    static associate(models) {
      Cart.belongsTo(models.Buyer, {
        foreignKey: 'buyerId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Cart.init( 
    {
     
      buyerId: {
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