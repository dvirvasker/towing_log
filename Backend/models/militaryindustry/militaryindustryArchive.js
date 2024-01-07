const mongoose = require("mongoose");
const { strategies } = require("passport");
const { ObjectId } = mongoose.Schema;

const militaryindustryArchiveSchema = new mongoose.Schema(
  {
    personalnumber: { type: String },
    date_update: { type: Date, default: new Date() },
    ztakahim: { type: Number },
    tvachOgdati: { type: Number },
    egedTeneVeMerhavim: { type: Number },
    matkaliyot: { type: Number },
    atoda: { type: Number },

    reservationCenters: { type: Number },
    yachsam: { type: Number },
    pakladVeMesayat: { type: Number },
    unitsMatkaliyot: { type: Number },
  },
  { timestamps: true }
);

const MilitaryindustryArchive = mongoose.model(
  "MilitaryindustryArchive",
  militaryindustryArchiveSchema
);

module.exports = MilitaryindustryArchive;
