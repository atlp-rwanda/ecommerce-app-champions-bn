const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.hasMany(models.User,{onDelete:'SET NULL',onUpdate:'SET NULL'});
      Role.belongsToMany(models.Permission,{through:'RolePermission' });
    }
  }
  Role.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    roleName: {type:DataTypes.STRING},
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};