const mongoose = require("mongoose");
const uuid = require("node-uuid");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  _id: { type: String, default: uuid.v4, required: true },
  name: { type: String, required: true },
  familyName: { type: String, required: true },
  registrationNumber: { type: Number, required: true },
  classLevel: { type: String, required: true },
  MoyenneSe1: { type: Number, min:0,max:20 },
  MoyenneSe2: { type: Number, min:0,max:20 },
  MoyenneGe: { type: Number, min:0,max:20 },
  pointes: {
    nameOfSubject: { type: String, required: true },
    exam: { type: Number, min:0,max:20 },
    TD: { type: Number , min:0,max:20},
    TP: { type: Number , min:0,max:20 },
  },

  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
