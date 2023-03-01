import dotenv from "dotenv";
import db from "./models";

dotenv.config();

const connectDb = async () => {
  console.log("checking database connection");
  try {
    await db.sequelize.authenticate();
    console.log("db connected successful");
  } catch (error) {
    console.log("db connection failed", error.message);
  }
};

export default connectDb;
