const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const personnelSchema = new mongoose.Schema(
  {
    hova_soldiers: { type: Number, default: 0},
    keva: { type: Number, default: 0},
    civilian_employee: { type: Number, default: 0},
    student: { type: Number, default: 0},
    miluim: { type: Number, default: 0},
   
    
    casualty: { type: Number, default: 0},
    back_to_unit: { type: Number, default: 0},
    sadir_halalim: { type: Number, default: 0},
    miluim_halalim: { type: Number, default: 0},
  
  },
  { timestamps: true }
);

const Personnel = mongoose.model("personnel", personnelSchema);

module.exports = Personnel;
