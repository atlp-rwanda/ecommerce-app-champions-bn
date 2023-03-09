import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {
      this.belongsTo(models.Role);
      this.belongsTo(models.Permission);
    }
  }
  RolePermission.init({
    roleId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RolePermission',
  });
  return RolePermission;
};
