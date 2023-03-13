const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permission.belongsToMany(models.Role, {
        through: 'rolePermissions',
        foreignKey: 'permissionId',
      });
    }
  }
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },

      permissionName: DataTypes.STRING,
      description: DataTypes.STRING,
      
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
