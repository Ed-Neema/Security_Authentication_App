import mongoose from "mongoose"
import dotenv from "dotenv"

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "DB connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
