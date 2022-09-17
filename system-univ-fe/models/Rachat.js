const mongoose = require("mongoose");
const uuid = require("node-uuid");
const Schema = mongoose.Schema;

const RachatSchema = new Schema({
  _id: { type: String, default: uuid.v4, required: true },
  rachat: { type: String, required: true},
  promo: { type: String, required: true },
  year: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const Rachat = mongoose.model("Rachat", RachatSchema);
module.exports = Rachat;