const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      // define association here
      Permission.belongsToMany(models.Role,{through:'RolePermission' });
    }
  }
  Permission.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    permissionName: DataTypes.STRING,  
    permissionStatus:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    }    
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};