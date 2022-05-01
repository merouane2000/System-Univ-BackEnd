const mongoose = require("mongoose");
const uuid = require("node-uuid");
const Schema = mongoose.Schema;

const MarkSchema = new Schema({
  _id: { type: String, default: uuid.v4, required: true },

  subjectName: { type: String, required: true },
  exam: { type: Number, min: 0, max: 20 },
  TD: { type: Number, min: 0, max: 20 },
  TP: { type: Number, min: 0, max: 20 },

  student_id: { type: String },
  subject_id: { type: String },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Mark = mongoose.model("Mark", MarkSchema);
module.exports = Mark;
