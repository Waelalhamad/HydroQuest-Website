require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const mainRoutes = require("./routes/mainRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// MongoDB
async function connectDb() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connection established successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
}

connectDb();

app.use(express.static(path.join(path.resolve(), "../client")));

// routes
app.use("/", mainRoutes);
app.use("/api/v1/user", userRoutes)

// server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
