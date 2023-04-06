const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CouponCodeDiscount extends Model {
    static associate(models) {
      // define association here
      CouponCodeDiscount.belongsTo(models.Vendor);
      CouponCodeDiscount.belongsTo(models.Product);
    }
  }
  CouponCodeDiscount.init({
    couponCode: {type:DataTypes.STRING},
    ProductId: {type:DataTypes.INTEGER},
    discount: {type:DataTypes.INTEGER},
    discountStatus: {type:DataTypes.BOOLEAN,defaultValue:false},
    originalPrice: {type:DataTypes.DOUBLE},
    finalPrice: {type:DataTypes.DOUBLE},
    expirationTime: {type:DataTypes.DATE},
    VendorId:{type:DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'CouponCodeDiscount',
  });
  return CouponCodeDiscount;
};