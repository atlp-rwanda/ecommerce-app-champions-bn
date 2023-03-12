const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.user,{
        foreignKey:'roleId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      });
    }
  }
  Role.init(
    {
      roleName: DataTypes.STRING,
      description: DataTypes.STRING,
      permissions:{
        type:DataTypes.ARRAY(DataTypes.STRING)
      }
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
