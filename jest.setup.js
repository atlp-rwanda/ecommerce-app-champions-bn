import db from "./src/database/models";

process.env.NODE_ENV = "test";

// eslint-disable-next-line no-undef
beforeAll(async () => {
  await db.sequelize.drop();
  await db.sequelize.sync();
});
