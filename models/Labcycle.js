const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const LabcycleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

module.exports = Labcycle = model("labcycle", LabcycleSchema);
