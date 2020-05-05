const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const StudentSchema = new Schema({
  college_id: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true },
  section: { type: String, required: true },
  year: { type: String, required: true },
  department: { type: String, required: true },
  password: { type: String, required: true },
  register_date: { type: Date, default: Date.now },
  activeLabs: [Schema.Types.ObjectId],
  completedLabs: [Schema.Types.ObjectId]
});

const Student = model("student", StudentSchema);
exports.Student = Student;
