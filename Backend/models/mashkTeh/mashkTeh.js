const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const mashkTehSchema = new mongoose.Schema(
  {
    hatcim: { type: Number, default: 0},
    hatcim_kshirot: { type: Number, default: 0},
    bkhas: { type: Number, default: 0},
    bkhas_kshirot: { type: Number, default: 0},
    malar: { type: Number, default: 0},
    malar_kshirot: { type: Number, default: 0},
    malarCars: { type: Number, default: 0},
    malarCars_kshirot: { type: Number, default: 0},
    departments_caza: { type: Number, default: 0},
    migunim: { type: Number, default: 0},
    Pergolas: { type: Number, default: 0},

    pikodZafon_totalNum: { type: Number, default: 0},
    pikodZafon_totalNum_kshirot: { type: Number, default: 0},
    pikodDarom_totalNum: { type: Number, default: 0},
    pikodDarom_totalNum_kshirot: { type: Number, default: 0},

    //platformot
    raklar: { type: Number, default: 0},
    lhat: { type: Number, default: 0},
    nativ_hasra: { type: Number, default: 0},
    robotics: { type: Number, default: 0},
    barack: { type: Number, default: 0},

    //technological means
    life_support: { type: Number, default: 0},
    bow: { type: Number, default: 0},
    windbreaker: { type: Number, default: 0},
    hanit: { type: Number, default: 0},

    //Rock
    dummy_platforms: { type: Number, default: 0},
    rear_line_platforms: { type: Number, default: 0},
    rock_pos: { type: Number, default: 0},
    outpost_defenses: { type: Number, default: 0},
  },
  { timestamps: true }
);

const MashkTeh = mongoose.model("mashkTeh", mashkTehSchema);

module.exports = MashkTeh;
