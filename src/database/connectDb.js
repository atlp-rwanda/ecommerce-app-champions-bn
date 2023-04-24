/* istanbul ignore file */
import db from "./models";

const connectDb = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("db connected successful");
  } catch (error) {
    console.log("db connection failed", error.message);
  }
};

export default connectDb;
