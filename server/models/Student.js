const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    check_in_time: { type: Date, default: Date.now },
  },
  { collection: "students" }
);

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
