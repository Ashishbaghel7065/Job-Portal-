import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import ConnectDB from "./config/db.js";
import UserRoutes from "./routes/user.routes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 
app.use(cors()); 
app.use(bodyParser.json()); 

// Root Route
app.get("/", (req, res) => {
  res.send({
    message: `Server is working on Port : ${PORT}`,
    status: true,
    error: false,
  });
});



app.use("/api/v1",UserRoutes)

// Connect to Database
ConnectDB();


// Start Server
app.listen(PORT, () => {
  console.log(`Server is working on Port : ${PORT}`);
});
