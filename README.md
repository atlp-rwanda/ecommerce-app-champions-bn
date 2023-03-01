# ecommerce-app-champions-bn

## Installation & required steps

1. Make sure you have Node.js and PostgreSQL installed on your computer, If you don't have Postgres installed locally, you can use cloud database service such as https://www.elephantsql.com/ to create the databases
2. Clone this repository using the command : `git clone  `
3. Navigate to the project directory using the command ` cd commerce-app-champions-bn`
4. Install dependencies by running : `npm install`
5. Create a PostgreSQL database and update the `config/config.js` file with your database credentials.
6. Run the database migrations using Sequelize by running the following command: ` npx sequelize-cli db:migrate`
7. Start the application by running: `npm run dev`
