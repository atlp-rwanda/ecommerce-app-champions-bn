import envConfig from "../../config";

const { DB_USERNAME,DB_PASSWORD,DEV_DATABASE,DB_HOST,TEST_DATABASE,PRODUCTION_DATABASE } = envConfig[process.env.NODE_ENV];

module.exports = {
  development: {
    username:DB_USERNAME,
    password: DB_PASSWORD,
    database:DEV_DATABASE,
    host:DB_HOST,
    dialect: "postgres"
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: TEST_DATABASE,
    host: DB_HOST,
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
