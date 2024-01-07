const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const kshirotArchiveSchema = new mongoose.Schema(
  {
    personalnumber: { type: String},
    weeksArray:[Object],
  },
  { timestamps: true }
);

const KshirotArchive = mongoose.model("kshirotArchive", kshirotArchiveSchema);

module.exports = KshirotArchive;
