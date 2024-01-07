const mongoose = require("mongoose");
const { strategies } = require("passport");
const { ObjectId } = mongoose.Schema;

const holiyotArchiveSchema = new mongoose.Schema(
  {
    personalnumber: { type: String },
    date_update: { type: Date, default: new Date() },
    eged: { type: Number },
    hatal: { type: Number },
    masha: { type: Number },
    rapat: { type: Number },
  },
  { timestamps: true }
);

const HoliyotArchive = mongoose.model("HoliyotArchive", holiyotArchiveSchema);

module.exports = HoliyotArchive;
