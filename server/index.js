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
  .catch(() => {
    console.error("MongoDB connection failed!");
  })
  .then(() => console.log("MongoDB successfully connected!"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
