const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const LabSchema = new Schema({
  code: { type: String, requried: true },
  name: { type: String, requried: true },
  labcycles: [Schema.Types.ObjectId],
});

module.exports = Lab = model("lab", LabSchema);
