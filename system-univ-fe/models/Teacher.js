const mongoose = require("mongoose");
const uuid = require("node-uuid");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  _id: { type: String, default: uuid.v4, required: true },
  email: { type: String, required: true},
  name: { type: String, required: true },
  familyName: { type: String, required: true },
  subject: { type: String, required: true },
  isActive :{type:Boolean,default:false },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;