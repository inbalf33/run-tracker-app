require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const usersRouter = require("./routes/userRestController"); 

const app = express();
const port = process.env.PORT || 8181;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes 
app.use("/api/users", usersRouter); 

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running smoothly" });
});

// Listen & Connect to DB
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
  connectDB();
});