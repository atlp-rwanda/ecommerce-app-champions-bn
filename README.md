![Coverage](https://img.shields.io/badge/coverage-96%25-brightgreen.svg)

# ecommerce-app-champions-bn

## Installation & required steps

1. Make sure you have Node.js and PostgreSQL installed on your computer, If you don't have Postgres installed locally, you can use cloud database service such as https://www.elephantsql.com/ to create the databases
2. Clone this repository using the command : `git clone  `
3. Navigate to the project directory using the command ` cd commerce-app-champions-bn`
4. Install dependencies by running : `npm install`
5. Create a PostgreSQL database and update the `config/config.js` file with your database credentials.
6. Run the database migrations using Sequelize by running the following command: `npm run migrate:up`
7. Start the application by running: `npm run dev`

## Environment Variables

Before running the application using docker , make sure to set the following environment variables:
1. DB_HOST: Must be set to 'db'
2. DB_USERNAME: The username for your PostgreSQL database
3. DB_PASSWORD: The password for your PostgreSQL database
4. DB_NAME: The name of your PostgreSQL database
5. PORT: The port number that the application will run on

Note: DB_USERNAME and DB_NAME must be the same.
## Running docker 

1.Make sure you have docker installed.

2. Clone this repository using the command : `git clone  `

3. Navigate to the project directory using the command ` cd commerce-app-champions-bn` and open it with your editor mostly vscode.

4. Navigate to the docker branch by running : `git checkout ch-setup-docker` in the terminal

5. Install dependencies by running : `npm install` in the terminal and configure your environment variables.

6. Run the this script  : `npm run docker:compose:up` to run build of images and containers but make sure that docker is running.

7. Run this script to stop and delete containers: `npm run docker:compose:down`

8. You can also run : `npm run docker:compose:build` for building but it is 'optional'.
