


// const { Model } = require("sequelize");

// module.exports = (sequelize, DataTypes) => {
//   class RolePermission extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   RolePermission.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//       },

//       roleId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'roles',
//           key: 'id',
//         },
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//       },
//       permissionId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'permissions',
//           key: 'id',
//         },
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//       },
      
//     },
//     {
//       sequelize,
//       modelName: "RolePermission",
//       tableName: "rolePermissions",
//       timestamps: true
//     }
//   );
//   return RolePermission;
// };


const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {}

  RolePermission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      permissionId: {
        // type: DataTypes.ARRAY(DataTypes.INTEGER),
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
         sequelize,
          modelName: "RolePermission",
           tableName: "rolePermissions",
             timestamps: true
           }
  );

  return RolePermission;
};
