export async function up(queryInterface, Sequelize) {
  // Add seed commands here.
  // Example:
  await queryInterface.bulkInsert(
    "Permission",
    [
      {
        id: 1,
        permissionName: "view_products",
        description: "Can view products",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        permissionName: "edit_products",
        description: "Can edit products",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        permissionName: "delete_products",
        description: "Can delete products",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  );
}
export async function down(queryInterface, Sequelize) {
  // Add commands to revert seed here.
  // Example:
  await queryInterface.bulkDelete("Permission", null, {});
}
