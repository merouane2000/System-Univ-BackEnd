const mongoose = require("mongoose");
const uuid = require("node-uuid");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  _id: { type: String, default: uuid.v4, required: true },
  name: { type: String, required: true },
  semester: { type: String },
  year:{type:String},
  student_id: {  type: mongoose.Schema.Types.ObjectId },
  coef: { type: Number, min: 1, max: 5 },
  credit: { type: Number, min: 1, max: 5 },
  coefExam:{type:Number},
  coefTP:{type:Number},
  coefTD:{type:Number},
  exam: { type: Number, min: 0, max: 20, default: 0 },
  TD: { type: Number, min: 0, max: 20 , default: 0 },
  TP: { type: Number, min: 0, max: 20 , default: 0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Subject = mongoose.model("Subject", SubjectSchema);
module.exports = Subject;
