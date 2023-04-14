const { Model, INTEGER } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CouponCodeDiscount extends Model {
    static associate(models) {
      // define association here
      CouponCodeDiscount.belongsTo(models.Vendor);
      CouponCodeDiscount.belongsTo(models.Product,{foreignKey:'product'});
    }
  }
  CouponCodeDiscount.init({
    couponCode: {type:DataTypes.STRING},
    product: {type:DataTypes.INTEGER},
    discount: {type:DataTypes.INTEGER},
    expirationDate: {type:DataTypes.DATE},
    maxUsage:{type:DataTypes.INTEGER,defaultValue:1},
    usageCount:{type:DataTypes.INTEGER,defaultValue:0},
    VendorId:{type:DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'CouponCodeDiscount',
  });
  return CouponCodeDiscount;
};