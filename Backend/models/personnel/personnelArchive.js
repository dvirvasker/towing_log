const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const personnelArchiveSchema = new mongoose.Schema(
  {
    personalnumber: { type: String},
    
    hova_soldiers: { type: Number, default: 0},
    keva: { type: Number, default: 0},
    civilian_employee: { type: Number, default: 0},
    student: { type: Number, default: 0},
    miluim: { type: Number, default: 0},
    totalSolider: { type: Number, default: 0},
    
    casualty: { type: Number, default: 0},
    back_to_unit: { type: Number, default: 0},
    totalHalalim: { type: Number, default: 0},
    sadir_halalim: { type: Number, default: 0},
    miluim_halalim: { type: Number, default: 0},
  },
  { timestamps: true }
);

const PersonnelArchive = mongoose.model("personnelArchive", personnelArchiveSchema);

module.exports = PersonnelArchive;
