/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vendors', [
      {
      UserId: 2,
      birthDate: new Date(),
      gender:null,
      businessName:'leo Fashion Design',
      businessAddress:null,
      accountNumber:7108495,
      taxIdNumber: 12755,
      typeOfProducts:'clothes',
      preferredCurency:'euros',
      state:'england',
      city:'manchester',
      postalCode:1020,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      UserId: 3,
      birthDate: new Date(),
      gender:null,
      businessName:'better designs',
      businessAddress:null,
      accountNumber:7108495,
      taxIdNumber: 12755,
      typeOfProducts:'clothes and software',
      preferredCurency:'dollars',
      state:'kigali',
      city:'rwanda',
      postalCode:1020,
      createdAt:new Date(),
      updatedAt:new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vendors', null, {});
  }
};
