const mongoose = require("mongoose");
const uuid = require("node-uuid");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  familyName: { type: String, required: true },
  registrationNumber: { type: Number, required: true },
  classes: [{type: mongoose.Schema.Types.ObjectId, ref:'Classes'}],
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});
const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;