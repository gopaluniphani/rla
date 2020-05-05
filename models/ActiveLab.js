const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const ActiveLabSchema = new Schema({
  instructor: { type: Schema.Types.ObjectId, ref: "Instructor" },
  code: { type: String, required: true },
  name: { type: String, required: true },
  labcycles: [Schema.Types.ObjectId],
  students: { type: [Schema.Types.ObjectId], ref: "Student" },
});

module.exports = ActiveLab = model("activelab", ActiveLabSchema);
