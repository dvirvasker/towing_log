const mongoose = require("mongoose");
const { strategies } = require("passport");
const { ObjectId } = mongoose.Schema;

const civilindustryArchiveSchema = new mongoose.Schema(
  {
    personalnumber: { type: String },
    date_update: { type: Date, default: new Date() },

    batashVeKravi: { type: Number },
    trucksAndMinhala: { type: Number },
    ztmaVeMi: { type: Number },
    merkazHovala: { type: Number },
    pikudHaoref: { type: Number },
    hatal: { type: Number },
    masha: { type: Number },
    maharas: { type: Number },

    krtfilerVeZoko: { type: Number },
    machpileKoach: { type: Number },
    tosefetHozit: { type: Number },
    mifalimMerotakim: { type: Number },
  },
  { timestamps: true }
);

const CivilindustryArchive = mongoose.model(
  "CivilindustryArchive",
  civilindustryArchiveSchema
);

module.exports = CivilindustryArchive;
