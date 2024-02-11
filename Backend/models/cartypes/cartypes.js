const mongoose = require("mongoose");
const { strategies } = require("passport");
const { ObjectId } = mongoose.Schema;

const cartypesSchema = new mongoose.Schema(
  {
    carType: { type: String },
    weight: { type: String },
  },
  { timestamps: true }
);

const CarTypes = mongoose.model("cartypes", cartypesSchema);

module.exports = CarTypes;
