# ecommerce-app-champions-bn

[![Maintainability](https://api.codeclimate.com/v1/badges/fb91db00552528c57d12/maintainability)](https://codeclimate.com/github/atlp-rwanda/ecommerce-app-champions-bn/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/fb91db00552528c57d12/test_coverage)](https://codeclimate.com/github/atlp-rwanda/ecommerce-app-champions-bn/test_coverage) [![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

## Installation & required steps

1. Make sure you have Node.js and PostgreSQL installed on your computer, If you don't have Postgres installed locally, you can use cloud database service such as https://www.elephantsql.com/ to create the databases
2. Clone this repository using the command : `git clone  `
3. Navigate to the project directory using the command ` cd commerce-app-champions-bn`
4. Install dependencies by running : `npm install`
5. Create a PostgreSQL database and update the `config/config.js` file with your database credentials.
6. Run the database migrations using Sequelize by running the following command: `npm run migrate:up`
7. Start the application by running: `npm run dev`
