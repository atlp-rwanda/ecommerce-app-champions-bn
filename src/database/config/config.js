/* istanbul ignore file */
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DB_HOST,
    dialect:'postgres'
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_DB_HOST,
    dialect: "postgres"

  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
};