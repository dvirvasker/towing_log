const mongoose = require("mongoose");
const { strategies } = require("passport");
const { ObjectId } = mongoose.Schema;

const civilindustrySchema = new mongoose.Schema(
  {
    personalnumber: { type: String },
    date_update: { type: Date, default: new Date() },

    batashVeKravi: { type: Number, default: 0 },
    trucksAndMinhala: { type: Number, default: 0 },
    ztmaVeMi: { type: Number, default: 0 },
    merkazHovala: { type: Number, default: 0 },
    pikudHaoref: { type: Number, default: 0 },
    hatal: { type: Number, default: 0 },
    masha: { type: Number, default: 0 },
    maharas: { type: Number, default: 0 },

    krtfilerVeZoko: { type: Number, default: 0 },
    machpileKoach: { type: Number, default: 0 },
    tosefetHozit: { type: Number, default: 0 },
    mifalimMerotakim: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Civilindustry = mongoose.model("Civilindustry", civilindustrySchema);

module.exports = Civilindustry;
