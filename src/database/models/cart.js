const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
   
    static associate(models) {
      cart.belongsTo(models.Buyer, {
        foreignKey: 'buyerId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  cart.init( 
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
    modelName: 'cart',
  });
  return cart;
};