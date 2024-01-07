const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    personalnumber: { type: String, trim: true, unique: true, required: true },

    firstName: { type: String, trim: true, required: true, maxlength: 32 },
    lastName: { type: String, trim: true, required: true },

    admin: { type: String, default: "1" },
    password: { type: String, required: true },
    // adminType: { type: String, default: "0" },
    /*
      ? 0 -  מנהל מערכת
     ? 1 - צפייה  
     ? 2 - עריכה  
     */

    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
