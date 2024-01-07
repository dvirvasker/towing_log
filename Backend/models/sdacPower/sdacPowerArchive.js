const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const sdacPowerArchiveSchema = new mongoose.Schema(
  {
    personalnumber: { type: String},

    darom_tank: { type: Number, default: 0},
    darom_namer: { type: Number, default: 0},
    darom_hashaz: { type: Number, default: 0},
    darom_ngmash: { type: Number, default: 0},
    darom_tomat: { type: Number, default: 0},
    darom_zma: { type: Number, default: 0},
    darom_car: { type: Number, default: 0},

    merkaz_tank: { type: Number, default: 0},
    merkaz_ngmash: { type: Number, default: 0},
    merkaz_zma: { type: Number, default: 0},
    merkaz_car: { type: Number, default: 0},
    
    zafon_tank: { type: Number, default: 0},
    zafon_namer: { type: Number, default: 0},
    zafon_hashaz: { type: Number, default: 0},
    zafon_ngmash: { type: Number, default: 0},
    zafon_tomat: { type: Number, default: 0},
    zafon_zma: { type: Number, default: 0},
    zafon_car: { type: Number, default: 0},
  
  },
  { timestamps: true }
);

const SdacPowerArchive = mongoose.model("sdacPowerArchive", sdacPowerArchiveSchema);

module.exports = SdacPowerArchive;
