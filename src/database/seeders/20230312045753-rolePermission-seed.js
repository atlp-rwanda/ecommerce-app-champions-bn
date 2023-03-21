/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("rolePermissions", [
      { roleId: 1, 
        permissionId: 1, 
        createdAt: new Date(), 
        updatedAt: new Date()
       },
      { roleId: 1, 
        permissionId: 2, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { roleId: 2, 
        permissionId: 2, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { roleId: 2, 
        permissionId: 3, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("rolePermissions", null, {});
  }
};
