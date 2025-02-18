import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const dbUrl: string = process.env.DB_CONN_STRING as string;

const connectToDataBase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("connect success to the db!");
  } catch (err) {
    console.error("Failed to connect to the db", err);
  }
};

export default connectToDataBase;
