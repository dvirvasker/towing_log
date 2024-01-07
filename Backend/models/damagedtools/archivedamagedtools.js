const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const archivedamagedToolsSchema = new mongoose.Schema(
  {
    personalnumber: { type: String},

    c4_trained: { type: Number, default: 0 },
    c4_treatment: { type: Number, default: 0},
    c4_shutdown: { type: Number, default: 0},
    c4_rescue: { type: Number, default: 0},

    c3_trained: { type: Number, default: 0 },
    c3_treatment: { type: Number, default: 0},
    c3_shutdown: { type: Number, default: 0},
    c3_rescue: { type: Number, default: 0},

    malar_trained: { type: Number, default: 0 },
    malar_treatment: { type: Number, default: 0},
    malar_shutdown: { type: Number, default: 0},
    malar_rescue: { type: Number, default: 0},

    namer_trained: { type: Number, default: 0 },
    namer_treatment: { type: Number, default: 0},
    namer_shutdown: { type: Number, default: 0},
    namer_rescue: { type: Number, default: 0},

    zma_trained: { type: Number, default: 0 },
    zma_treatment: { type: Number, default: 0},
    zma_shutdown: { type: Number, default: 0},
    zma_rescue: { type: Number, default: 0},

    hasz_trained: { type: Number, default: 0 },
    hasz_treatment: { type: Number, default: 0},
    hasz_shutdown: { type: Number, default: 0},
    hasz_rescue: { type: Number, default: 0},

    nagmash_trained: { type: Number, default: 0 },
    nagmash_treatment: { type: Number, default: 0},
    nagmash_shutdown: { type: Number, default: 0},
    nagmash_rescue: { type: Number, default: 0},

    until_timron_tank_trained: { type: Number, default: 0},
    until_timron_tank_left: { type: Number, default: 0 },

    until_timron_malar_trained: { type: Number, default: 0},
    until_timron_malar_left: { type: Number, default: 0 },

    until_timron_namer_trained: { type: Number, default: 0},
    until_timron_namer_left: { type: Number, default: 0 },

    until_timron_dahfor_trained: { type: Number, default: 0},
    until_timron_dahfor_left: { type: Number, default: 0 },

    until_timron_hasz_trained: { type: Number, default: 0},
    until_timron_hasz_left: { type: Number, default: 0 },

    from_timron_tank_trained: { type: Number, default: 0},
    from_timron_tank_left: { type: Number, default: 0 },

    from_timron_malar_trained: { type: Number, default: 0},
    from_timron_malar_left: { type: Number, default: 0 },

    from_timron_namer_trained: { type: Number, default: 0},
    from_timron_namer_left: { type: Number, default: 0 },

    from_timron_dahfor_trained: { type: Number, default: 0},
    from_timron_dahfor_left: { type: Number, default: 0 },

    from_timron_hasz_trained: { type: Number, default: 0},
    from_timron_hasz_left: { type: Number, default: 0 },

    tank_fix: { type: Number, default: 0 },
    tank_till_weeks: { type: Number, default: 0},
    tank_till_month: { type: Number, default: 0},
    tank_up_month: { type: Number, default: 0},
    tank_long_fix: { type: Number, default: 0},

    malar_fix: { type: Number, default: 0 },
    malar_till_weeks: { type: Number, default: 0},
    malar_till_month: { type: Number, default: 0},
    malar_up_month: { type: Number, default: 0},
    malar_long_fix: { type: Number, default: 0},

    namer_fix: { type: Number, default: 0 },
    namer_till_weeks: { type: Number, default: 0},
    namer_till_month: { type: Number, default: 0},
    namer_up_month: { type: Number, default: 0},
    namer_long_fix: { type: Number, default: 0},

    dahfor_fix: { type: Number, default: 0 },
    dahfor_till_weeks: { type: Number, default: 0},
    dahfor_till_month: { type: Number, default: 0},
    dahfor_up_month: { type: Number, default: 0},
    dahfor_long_fix: { type: Number, default: 0},

    hasz_fix: { type: Number, default: 0 },
    hasz_till_weeks: { type: Number, default: 0},
    hasz_till_month: { type: Number, default: 0},
    hasz_up_month: { type: Number, default: 0},
    hasz_long_fix: { type: Number, default: 0},

    pikod_fix: { type: Number, default: 0 },
    pikod_till_weeks: { type: Number, default: 0},
    pikod_till_month: { type: Number, default: 0},
    pikod_up_month: { type: Number, default: 0},
    pikod_long_fix: { type: Number, default: 0},

    egad_fix: { type: Number, default: 0 },
    egad_till_weeks: { type: Number, default: 0},
    egad_till_month: { type: Number, default: 0},
    egad_up_month: { type: Number, default: 0},
    egad_long_fix: { type: Number, default: 0},

    masha_fix: { type: Number, default: 0 },
    masha_till_weeks: { type: Number, default: 0},
    masha_till_month: { type: Number, default: 0},
    masha_up_month: { type: Number, default: 0},
    masha_long_fix: { type: Number, default: 0},

    katrapiler_fix: { type: Number, default: 0 },
    katrapiler_till_weeks: { type: Number, default: 0},
    katrapiler_till_month: { type: Number, default: 0},
    katrapiler_up_month: { type: Number, default: 0},
    katrapiler_long_fix: { type: Number, default: 0},

    nt_trained: { type: Number, default: 0 },
    nt_treatment: { type: Number, default: 0},
    nt_shutdown: { type: Number, default: 0},

    mtan_trained: { type: Number, default: 0 },
    mtan_treatment: { type: Number, default: 0},
    mtan_shutdown: { type: Number, default: 0},

    pazmar_trained: { type: Number, default: 0 },
    pazmar_treatment: { type: Number, default: 0},
    pazmar_shutdown: { type: Number, default: 0},

    fire_trained: { type: Number, default: 0 },
    fire_treatment: { type: Number, default: 0},
    fire_shutdown: { type: Number, default: 0},

    reversal_trained: { type: Number, default: 0 },
    reversal_treatment: { type: Number, default: 0},
    reversal_shutdown: { type: Number, default: 0},

    other_trained: { type: Number, default: 0 },
    other_treatment: { type: Number, default: 0},
    other_shutdown: { type: Number, default: 0},
  },
  { timestamps: true }
);

const DamagedToolsArchive = mongoose.model("damagedToolsArchive", archivedamagedToolsSchema);

module.exports = DamagedToolsArchive;
