const mongoose = require("mongoose");
const { strategies } = require("passport");
const { ObjectId } = mongoose.Schema;

const cardatasSchema = new mongoose.Schema(
  {
    carnumber: { type: String },
    gdodId: { type: String },
    makatId: { type: String },
    carTypeId: { type: ObjectId },
  },
  { timestamps: true }
);

const CarDatasSchema = mongoose.model("cardatas", cardatasSchema);

module.exports = CarDatasSchema;
