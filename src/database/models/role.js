const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.hasMany(models.user,{foreignKey:'roleId',as:'users'});
    }
  }
  Role.init(
    {
      roleName: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
      timestamps: true
    }
  );
  return Role;
};
