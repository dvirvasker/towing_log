const mongoose = require("mongoose");
const { strategies } = require("passport");
const { ObjectId } = mongoose.Schema;

const halfimSchema = new mongoose.Schema(
  {
    personalnumber: { type: String },
    date_update: { type: Date, default: new Date() },

    mk4Number: { type: Number, default: 0 },
    malarGinsNumber: { type: Number, default: 0 },
    mk3Number: { type: Number, default: 0 },
    namerNumber: { type: Number, default: 0 },
    pumaNumber: { type: Number, default: 0 },
    achzaritNumber: { type: Number, default: 0 },
    dahporimNumber: { type: Number, default: 0 },
    tomatNumber: { type: Number, default: 0 },
    hamerNumber: { type: Number, default: 0 },
    s3ramahHalfim: { type: Number, default: 0 },
    tomatHalfim: { type: Number, default: 0 },
    s3ramahKshirot: { type: Number, default: 0 },
    trucks: { type: Number, default: 0 },

    itemsInStockZero: { type: Number, default: 0 },

    ogda162: { type: Number, default: 0 },
    ogda36: { type: Number, default: 0 },
    ogda252: { type: Number, default: 0 },
    ogda143: { type: Number, default: 0 },
    ogda98: { type: Number, default: 0 },

    drishotDarom: { type: Number, default: 0 },
    dhiyotDarom: { type: Number, default: 0 },
    nipukimDarom: { type: Number, default: 0 },
    drishotZtafon: { type: Number, default: 0 },
    dhiyotZtafon: { type: Number, default: 0 },
    nipukimZtafon: { type: Number, default: 0 },

    merkavamk4Text: { type: String, default: "" },
    merkavamk3Text: { type: String, default: "" },
    tomatText: { type: String, default: "" },
    ginsText: { type: String, default: "" },
    namerText: { type: String, default: "" },
    pumaText: { type: String, default: "" },
    achzaritText: { type: String, default: "" },
    dahpurText: { type: String, default: "" },
  },
  { timestamps: true }
);

const Halfim = mongoose.model("halfim", halfimSchema);

module.exports = Halfim;
