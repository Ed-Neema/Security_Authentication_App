import express from "express"
import dotenv from "dotenv" 
import { connectDB } from "./utils/dbConnection.js"
import authRoutes from "./routes/auth.route.js"
import requestRoutes from "./routes/request.route.js"
import userRoutes from "./routes/users.route.js"
import cookieParser from "cookie-parser";
dotenv.config()

const app = express()
connectDB()
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000
// app.use(errorHandler);
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
}) 


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});