const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.user,{
        foreignKey:'roleId',
        as:'role',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      });
    }
  }
  Role.init(
    {
      id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
      },
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
