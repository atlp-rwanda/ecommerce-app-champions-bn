import envConfig from "../../config";

const { DB_USERNAME,DB_PASSWORD,DEV_DATABASE,DB_HOST,
  TEST_DATABASE,PRODUCTION_DATABASE,TEST_DB_HOST,TEST_DB_PASSWORD,
  TEST_DB_USERNAME
 } = envConfig[process.env.NODE_ENV];

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
