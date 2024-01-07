const mongoose = require("mongoose");
const { strategies } = require("passport");
const { ObjectId } = mongoose.Schema;

const militaryindustrySchema = new mongoose.Schema(
  {
    personalnumber: { type: String },
    date_update: { type: Date, default: new Date() },
    ztakahim: { type: Number, default: 0 },
    tvachOgdati: { type: Number, default: 0 },
    egedTeneVeMerhavim: { type: Number, default: 0 },
    matkaliyot: { type: Number, default: 0 },
    atoda: { type: Number, default: 0 },

    reservationCenters: { type: Number, default: 0 },
    yachsam: { type: Number, default: 0 },
    pakladVeMesayat: { type: Number, default: 0 },
    unitsMatkaliyot: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Militaryindustry = mongoose.model(
  "Militaryindustry",
  militaryindustrySchema
);

module.exports = Militaryindustry;
