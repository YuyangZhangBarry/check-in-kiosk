const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

router.get("/index", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error({ error: err.message });
  }
});

module.exports = router;
