const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/student");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", router);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB successfully connected!"))
  .catch(() => {
    console.error("MongoDB connection failed!");
  });

module.exports = app;
