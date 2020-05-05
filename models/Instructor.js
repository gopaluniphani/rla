const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const InstructorSchema = new Schema({
  college_id: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  password: { type: String, required: true },
  register_date: { type: Date, default: Date.now },
  activeLabs: { type: [Schema.Types.ObjectId], default: [] },
  completedLabs: { type: [Schema.Types.ObjectId], default: [] }
});

const Instructor = model("instructor", InstructorSchema);
exports.Instructor = Instructor;
