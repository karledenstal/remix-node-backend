import { connect } from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_PATH;

export const connectDB = async () => {
  try {
    await connect(`${uri}`, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      dbName: process.env.MONGO_DB,
    });
  } catch (e) {
    console.error(e);
  }
};
