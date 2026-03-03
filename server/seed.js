const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./models/Student");

dotenv.config();

const app = express();

app.use(express.json());

const seedData = [
  {
    first_name: "Yuyang",
    last_name: "Zhang",
  },
  {
    first_name: "Peter",
    last_name: "Parker",
  },
];

mongoose
  .connect(process.env.MONGODB_URI)
  .catch(() => {
    console.error("MongoDB connection failed!");
  })
  .then(() => console.log("MongoDB successfully connected!"));

const seed = async () => {
  try {
    await Student.deleteMany();
    await Student.insertMany(seedData);
    console.log("Inserted two seed data!");
    process.exit(0);
  } catch (err) {
    console.log({ error: err.message });
    process.exit(-1);
  }
};

seed();
