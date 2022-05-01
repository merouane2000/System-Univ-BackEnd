const mongoose = require("mongoose");
const uuid = require("node-uuid");
const Schema = mongoose.Schema;

const ClassesSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  year: { type: String },
  semastre: { type: String },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Classes = mongoose.model("Classes", ClassesSchema);
module.exports = Classes;
