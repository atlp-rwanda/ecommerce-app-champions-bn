'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      // await queryInterface.addColumn('Users', { passwordStatus: Sequelize.BOOLEAN } );
      await Promise.all([
        queryInterface.addColumn('Users', 'passwordStatus', {
          type: Sequelize.BOOLEAN
        }),
        queryInterface.addColumn('Users', 'lastPasswordUpdate', {
          type: Sequelize.DATEONLY,
        }),
       
      ])
    },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.removeColumn('Users' , passwordStatus);
     
  }
};
