const mongoose = require("mongoose");
const uuid = require("node-uuid");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  _id: { type: String, default: uuid.v4, required: true },
  subjectName: { type: String, required: true },
  subjectoFSemaster: { type: String },
  coif: { type: Number, min: 1, max: 5 },
  credit: { type: Number, min: 1, max: 5 },
  coifExam:{type:Number},
  coifTp:{type:Number},
  coifTd:{type:Number},
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Subject = mongoose.model("Subject", SubjectSchema);
module.exports = Subject;
