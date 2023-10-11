import express from "express"
import dotenv from "dotenv" 
import { connectDB } from "./utils/dbConnection.js"
import authRoutes from "./routes/auth.route.js"
import requestRoutes from "./routes/request.route.js"
import userRoutes from "./routes/users.route.js"
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config()

const app = express()
// find the directory name that our app will run on in our server
const __dirname = path.resolve() //find the dynamic director name

app.use(express.static(path.join(__dirname,'/client/dist'))) //serve static files from the specified directory
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html")); //for any GET request that doesn't match the static files in the 'client/dist' directory, it will serve the 'index.html' file.
});
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