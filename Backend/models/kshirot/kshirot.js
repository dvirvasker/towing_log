const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const kshirotSchema = new mongoose.Schema(
  {
      weeksArray:[Object],
  },

  { timestamps: true }
);


const Kshirot = mongoose.model("kshirot", kshirotSchema);

module.exports = Kshirot;
