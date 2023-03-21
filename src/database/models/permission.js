const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role,{through:'RolePermission' });
    }
  }
  Permission.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      permissionName: DataTypes.STRING,      
    },
    {
      sequelize,
      modelName: "Permission",
      tableName: "permissions",
      timestamps: true
    }
  );
  return Permission;
};
