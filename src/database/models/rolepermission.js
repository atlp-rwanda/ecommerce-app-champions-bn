const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {

    }
  }
  RolePermission.init({
    RoleId: DataTypes.INTEGER,
    PermissionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RolePermission',
  });
  return RolePermission;
};
