const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReportedActivity extends Model {
    static associate(models) {
      // define association here
      ReportedActivity.belongsTo(models.Vendor,{foreignKey:'VendorId'});
    }
  }
  ReportedActivity.init({
    category: DataTypes.STRING,
    activity: DataTypes.STRING,
    VendorId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReportedActivity',
  });
  return ReportedActivity;
};