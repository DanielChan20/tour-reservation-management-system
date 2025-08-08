import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected: ", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.error("Error connecting to DB:", err);
    process.exit(1);
  }
};

export default connectDB;
