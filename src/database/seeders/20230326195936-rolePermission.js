/** @type {import('sequelize-cli').Migration} */

import bcrypt from "bcrypt";

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('RolePermissions', [
      {
        RoleId:1,
        PermissionId:1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      RoleId:1,
      PermissionId:2,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    RoleId:2,
    PermissionId:3,
    createdAt: new Date(),
    updatedAt: new Date()
 },
 {
  RoleId:2,
  PermissionId:4,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  RoleId:3,
  PermissionId:5,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  RoleId:3,
  PermissionId:6,
  createdAt: new Date(),
  updatedAt: new Date()
},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RolePermissions', null, {});
  }
};
