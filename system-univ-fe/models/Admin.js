const mongoose = require("mongoose");
const uuid = require("node-uuid");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  _id: { type: String, default: uuid.v4, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;