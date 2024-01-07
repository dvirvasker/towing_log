const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const archivenesoaShchikaSchema = new mongoose.Schema(
  {
    personalnumber: { type: String},

    c4_km_day: { type: Number, default: 0 },
    c3_km_day: { type: Number, default: 0 },
    namer_km_day: { type: Number, default: 0 },
    puma_km_day: { type: Number, default: 0 },
    ahzarit_km_day: { type: Number, default: 0 },

    c4_km_avg: { type: Number, default: 0 },
    c3_km_avg: { type: Number, default: 0 },
    namer_km_avg: { type: Number, default: 0 },
    puma_km_avg: { type: Number, default: 0 },
    ahzarit_km_avg: { type: Number, default: 0 },

    c4_sham_avg: { type: Number, default: 0 },
    c3_sham_avg: { type: Number, default: 0 },
    namer_sham_avg: { type: Number, default: 0 },
    puma_sham_avg: { type: Number, default: 0 },
    dahforim_sham_avg: { type: Number, default: 0 },

    c4_tools: { type: Number, default: 0 },
    c3_bz_tools: { type: Number, default: 0 },
    c3_rmh_tools: { type: Number, default: 0 },
    namer_tools: { type: Number, default: 0 },
    dahforim_tools: { type: Number, default: 0 },
  
    c4_tools_damaged: { type: Number, default: 0 },
    c3_bz_tools_damaged: { type: Number, default: 0 },
    c3_rmh_tools_damaged: { type: Number, default: 0 },
    namer_tools_damaged: { type: Number, default: 0 },
    dahforim_tools_damaged: { type: Number, default: 0 },

    c4_hatak: { type: Number, default: 0 },
    c3_hatak: { type: Number, default: 0 },
    namer_hatak: { type: Number, default: 0 },
    dahforim_hatak: { type: Number, default: 0 },

    c4_bakash: { type: Number, default: 0 },
    c3_bakash: { type: Number, default: 0 },
    namer_bakash: { type: Number, default: 0 },
    dahforim_bakash: { type: Number, default: 0 },

    c4_coat: { type: Number, default: 0 },
    c3_coat: { type: Number, default: 0 },
    namer_coat: { type: Number, default: 0 },
    dahforim_coat: { type: Number, default: 0 },

    c4_end: { type: Number, default: 0 },
    c3_end: { type: Number, default: 0 },
    namer_end: { type: Number, default: 0 },
    dahforim_end: { type: Number, default: 0 },

    c4_kanim: { type: Number, default: 0 },
    c3_kanim: { type: Number, default: 0 },
    namer_kanim: { type: Number, default: 0 },
    dahforim_kanim: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const archiveNesoaShchika = mongoose.model("nesoaShchikaArchive", archivenesoaShchikaSchema);

module.exports = archiveNesoaShchika;
