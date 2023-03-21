require('dotenv').config();

module.exports = {
  development: {
    username:DB_USERNAME,
    password: DB_PASSWORD,
    database:DEV_DATABASE,
    host:DB_HOST,
    dialect: "postgres"
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_DB_HOST,
    dialect: "postgres"

  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: PRODUCTION_DATABASE,
    host: DB_HOST,
    dialect: "postgres"
  }
};