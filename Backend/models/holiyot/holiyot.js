const mongoose = require("mongoose");
const { strategies } = require("passport");
const { ObjectId } = mongoose.Schema;

const holiyotSchema = new mongoose.Schema(
  {
    personalnumber: { type: String },
    date_update: { type: Date, default: new Date() },
    eged: { type: Number, default: 0 },
    hatal: { type: Number, default: 0 },
    masha: { type: Number, default: 0 },
    rapat: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Holiyot = mongoose.model("Holiyot", holiyotSchema);

module.exports = Holiyot;
