const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {
      // define association here
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