const mongoose = require("mongoose");
const { strategies } = require("passport");
const { ObjectId } = mongoose.Schema;

const garagesSchema = new mongoose.Schema(
  {
    garageName: { type: String },
    garageArea: { type: String },
  },
  { timestamps: true }
);

const Garages = mongoose.model("garages", garagesSchema);

module.exports = Garages;
