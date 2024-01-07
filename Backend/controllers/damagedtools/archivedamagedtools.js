const ArchivedDamagedTools = require("../../models/damagedtools/archivedamagedtools");

exports.find = (req, res) => {
    ArchivedDamagedTools.find((err, archiveddamagedtools) => {
    if (err) res.send(err);
    res.json(archiveddamagedtools);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
    ArchivedDamagedTools.findById(req.params.id, (err, archiveddamagedtools) => {
    if (err) res.send(err);
    res.json(archiveddamagedtools);
  });
};

exports.read = async (req, res) => {
    ArchivedDamagedTools.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
    const personalnumber = req.body.personalnumber;

    const c4_trained = Number(req.body.c4_trained);
    const c4_treatment = Number(req.body.c4_treatment);
    const c4_shutdown = Number(req.body.c4_shutdown);
    const c4_rescue = Number(req.body.c4_rescue);
  
    const c3_trained = Number(req.body.c3_trained);
    const c3_treatment = Number(req.body.c3_treatment);
    const c3_shutdown = Number(req.body.c3_rescue);
    const c3_rescue = Number(req.body.c3_rescue);
  
    const malar_trained = Number(req.body.malar_trained);
    const malar_treatment = Number(req.body.malar_treatment);
    const malar_shutdown = Number(req.body.malar_shutdown);
    const malar_rescue = Number(req.body.malar_rescue);
  
    const namer_trained = Number(req.body.namer_trained);
    const namer_treatment = Number(req.body.namer_treatment);
    const namer_shutdown = Number(req.body.namer_shutdown);
    const namer_rescue = Number(req.body.namer_rescue);
  
    const zma_trained = Number(req.body.zma_trained);
    const zma_treatment = Number(req.body.zma_treatment);
    const zma_shutdown = Number(req.body.zma_shutdown);
    const zma_rescue = Number(req.body.zma_rescue);
  
    const hasz_trained = Number(req.body.hasz_trained);
    const hasz_treatment = Number(req.body.hasz_treatment);
    const hasz_shutdown = Number(req.body.hasz_shutdown);
    const hasz_rescue = Number(req.body.hasz_rescue);
  
    const nagmash_trained = Number(req.body.nagmash_trained);
    const nagmash_treatment = Number(req.body.nagmash_treatment);
    const nagmash_shutdown = Number(req.body.nagmash_shutdown);
    const nagmash_rescue = Number(req.body.nagmash_rescue);
  
    const until_timron_tank_trained = Number(req.body.until_timron_tank_trained);
    const until_timron_tank_left = Number(req.body.until_timron_tank_left);
  
    const until_timron_malar_trained = Number(req.body.until_timron_malar_trained);
    const until_timron_malar_left = Number(req.body.until_timron_malar_left);
  
    const until_timron_namer_trained = Number(req.body.until_timron_namer_trained);
    const until_timron_namer_left = Number(req.body.until_timron_namer_left);
  
    const until_timron_dahfor_trained = Number(req.body.until_timron_dahfor_trained);
    const until_timron_dahfor_left = Number(req.body.until_timron_dahfor_left);
  
    const until_timron_hasz_trained = Number(req.body.until_timron_hasz_trained);
    const until_timron_hasz_left = Number(req.body.until_timron_hasz_left);
  
    const from_timron_tank_trained = Number(req.body.from_timron_tank_trained);
    const from_timron_tank_left = Number(req.body.from_timron_tank_left);
  
    const from_timron_malar_trained = Number(req.body.from_timron_malar_trained);
    const from_timron_malar_left = Number(req.body.from_timron_malar_left);
  
    const from_timron_namer_trained = Number(req.body.from_timron_namer_trained);
    const from_timron_namer_left = Number(req.body.from_timron_namer_left);
  
    const from_timron_dahfor_trained = Number(req.body.from_timron_dahfor_trained);
    const from_timron_dahfor_left = Number(req.body.from_timron_dahfor_left);
  
    const from_timron_hasz_trained = Number(req.body.from_timron_hasz_trained);
    const from_timron_hasz_left = Number(req.body.from_timron_hasz_left);
  
    const tank_fix = Number(req.body.tank_fix);
    const tank_till_weeks = Number(req.body.tank_till_weeks);
    const tank_till_month = Number(req.body.tank_till_month);
    const tank_up_month = Number(req.body.tank_up_month);
    const tank_long_fix = Number(req.body.tank_long_fix);
  
    const malar_fix = Number(req.body.malar_fix);
    const malar_till_weeks = Number(req.body.malar_till_weeks);
    const malar_till_month = Number(req.body.malar_till_month);
    const malar_up_month = Number(req.body.malar_up_month);
    const malar_long_fix = Number(req.body.malar_long_fix);
  
    const namer_fix = Number(req.body.namer_fix);
    const namer_till_weeks = Number(req.body.namer_till_weeks);
    const namer_till_month = Number(req.body.namer_till_month);
    const namer_up_month = Number(req.body.namer_up_month);
    const namer_long_fix = Number(req.body.namer_long_fix);
  
    const dahfor_fix = Number(req.body.dahfor_fix);
    const dahfor_till_weeks = Number(req.body.dahfor_till_weeks);
    const dahfor_till_month = Number(req.body.dahfor_till_month);
    const dahfor_up_month = Number(req.body.dahfor_up_month);
    const dahfor_long_fix = Number(req.body.dahfor_long_fix);
  
    const hasz_fix = Number(req.body.hasz_fix);
    const hasz_till_weeks = Number(req.body.hasz_till_weeks);
    const hasz_till_month = Number(req.body.hasz_till_month);
    const hasz_up_month = Number(req.body.hasz_up_month);
    const hasz_long_fix = Number(req.body.hasz_long_fix);
  
    const pikod_fix = Number(req.body.pikod_fix);
    const pikod_till_weeks = Number(req.body.pikod_till_weeks);
    const pikod_till_month = Number(req.body.pikod_till_month);
    const pikod_up_month = Number(req.body.pikod_up_month);
    const pikod_long_fix = Number(req.body.pikod_long_fix);
  
    const egad_fix = Number(req.body.egad_fix);
    const egad_till_weeks = Number(req.body.egad_till_weeks);
    const egad_till_month = Number(req.body.egad_till_month);
    const egad_up_month = Number(req.body.egad_up_month);
    const egad_long_fix = Number(req.body.egad_long_fix);
  
    const masha_fix = Number(req.body.masha_fix);
    const masha_till_weeks = Number(req.body.masha_till_weeks);
    const masha_till_month = Number(req.body.masha_till_month);
    const masha_up_month = Number(req.body.masha_up_month);
    const masha_long_fix = Number(req.body.masha_long_fix);
  
    const katrapiler_fix = Number(req.body.katrapiler_fix);
    const katrapiler_till_weeks = Number(req.body.katrapiler_till_weeks);
    const katrapiler_till_month = Number(req.body.katrapiler_till_month);
    const katrapiler_up_month = Number(req.body.katrapiler_up_month);
    const katrapiler_long_fix = Number(req.body.katrapiler_long_fix);
  
    const nt_trained = Number(req.body.nt_trained);
    const nt_treatment = Number(req.body.nt_treatment);
    const nt_shutdown = Number(req.body.nt_shutdown);
  
    const mtan_trained = Number(req.body.mtan_trained);
    const mtan_treatment = Number(req.body.mtan_treatment);
    const mtan_shutdown = Number(req.body.mtan_shutdown);
  
    const pazmar_trained = Number(req.body.pazmar_trained);
    const pazmar_treatment = Number(req.body.pazmar_treatment);
    const pazmar_shutdown = Number(req.body.pazmar_shutdown);
  
    const fire_trained = Number(req.body.fire_trained);
    const fire_treatment = Number(req.body.fire_treatment);
    const fire_shutdown = Number(req.body.fire_shutdown);
  
    const reversal_trained = Number(req.body.reversal_trained);
    const reversal_treatment = Number(req.body.reversal_treatment);
    const reversal_shutdown = Number(req.body.reversal_shutdown);
  
    const other_trained = Number(req.body.other_trained);
    const other_treatment = Number(req.body.other_treatment);
    const other_shutdown = Number(req.body.other_shutdown);
  
  const archiveddamagedtools = new ArchivedDamagedTools({
    personalnumber, 

    c4_trained,
    c4_treatment,
    c4_shutdown,
    c4_rescue,

    c3_trained,
    c3_treatment,
    c3_shutdown,
    c3_rescue,

    malar_trained,
    malar_treatment,
    malar_shutdown,
    malar_rescue,

    namer_trained,
    namer_treatment,
    namer_shutdown,
    namer_rescue,

    zma_trained,
    zma_treatment,
    zma_shutdown,
    zma_rescue,

    hasz_trained,
    hasz_treatment,
    hasz_shutdown,
    hasz_rescue,

    nagmash_trained,
    nagmash_treatment,
    nagmash_shutdown,
    nagmash_rescue,

    until_timron_tank_trained,
    until_timron_tank_left,
    
    until_timron_malar_trained,
    until_timron_malar_left,
    
    until_timron_namer_trained,
    until_timron_namer_left,
    
    until_timron_dahfor_trained,
    until_timron_dahfor_left,
    
    until_timron_hasz_trained,
    until_timron_hasz_left,

    from_timron_tank_trained,
    from_timron_tank_left,
    
    from_timron_malar_trained,
    from_timron_malar_left,
    
    from_timron_namer_trained,
    from_timron_namer_left,
    
    from_timron_dahfor_trained,
    from_timron_dahfor_left,
    
    from_timron_hasz_trained,
    from_timron_hasz_left,

    tank_fix,
    tank_till_weeks,
    tank_till_month,
    tank_up_month,
    tank_long_fix,

    malar_fix,
    malar_till_weeks,
    malar_till_month,
    malar_up_month,
    malar_long_fix,

    namer_fix,
    namer_till_weeks,
    namer_till_month,
    namer_up_month,
    namer_long_fix,

    dahfor_fix,
    dahfor_till_weeks,
    dahfor_till_month,
    dahfor_up_month,
    dahfor_long_fix,

    hasz_fix,
    hasz_till_weeks,
    hasz_till_month,
    hasz_up_month,
    hasz_long_fix,

    pikod_fix,
    pikod_till_weeks,
    pikod_till_month,
    pikod_up_month,
    pikod_long_fix,

    egad_fix,
    egad_till_weeks,
    egad_till_month,
    egad_up_month,
    egad_long_fix,

    masha_fix,
    masha_till_weeks,
    masha_till_month,
    masha_up_month,
    masha_long_fix,

    katrapiler_fix,
    katrapiler_till_weeks,
    katrapiler_till_month,
    katrapiler_up_month,
    katrapiler_long_fix,

    nt_trained,
    nt_treatment,
    nt_shutdown,

    mtan_trained,
    mtan_treatment,
    mtan_shutdown,

    pazmar_trained,
    pazmar_treatment,
    pazmar_shutdown,

    fire_trained,
    fire_treatment,
    fire_shutdown,

    reversal_trained,
    reversal_treatment,
    reversal_shutdown,

    other_trained,
    other_treatment,
    other_shutdown,

  });
  archiveddamagedtools.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  ArchivedDamagedTools.findById(req.params.id).then((request) => {
    request.personalnumber = req.body.personalnumber;
  
    request.c4_trained = Number(req.body.c4_trained);
    request.c4_treatment = Number(req.body.c4_treatment);
    request.c4_shutdown = Number(req.body.c4_shutdown);
    request.c4_rescue = Number(req.body.c4_rescue);
  
    request.c3_trained = Number(req.body.c3_trained);
    request.c3_treatment = Number(req.body.c3_treatment);
    request.c3_shutdown = Number(req.body.c3_rescue);
    request.c3_rescue = Number(req.body.c3_rescue);
  
    request.malar_trained = Number(req.body.malar_trained);
    request.malar_treatment = Number(req.body.malar_treatment);
    request.malar_shutdown = Number(req.body.malar_shutdown);
    request.malar_rescue = Number(req.body.malar_rescue);
  
    request.namer_trained = Number(req.body.namer_trained);
    request.namer_treatment = Number(req.body.namer_treatment);
    request.namer_shutdown = Number(req.body.namer_shutdown);
    request.namer_rescue = Number(req.body.namer_rescue);
  
    request.zma_trained = Number(req.body.zma_trained);
    request.zma_treatment = Number(req.body.zma_treatment);
    request.zma_shutdown = Number(req.body.zma_shutdown);
    request.zma_rescue = Number(req.body.zma_rescue);
  
    request.hasz_trained = Number(req.body.hasz_trained);
    request.hasz_treatment = Number(req.body.hasz_treatment);
    request.hasz_shutdown = Number(req.body.hasz_shutdown);
    request.hasz_rescue = Number(req.body.hasz_rescue);
  
    request.nagmash_trained = Number(req.body.nagmash_trained);
    request.nagmash_treatment = Number(req.body.nagmash_treatment);
    request.nagmash_shutdown = Number(req.body.nagmash_shutdown);
    request.nagmash_rescue = Number(req.body.nagmash_rescue);
  
    request.until_timron_tank_trained = Number(req.body.until_timron_tank_trained);
    request.until_timron_tank_left = Number(req.body.until_timron_tank_left);
  
    request.until_timron_malar_trained = Number(req.body.until_timron_malar_trained);
    request.until_timron_malar_left = Number(req.body.until_timron_malar_left);
  
    request.until_timron_namer_trained = Number(req.body.until_timron_namer_trained);
    request.until_timron_namer_left = Number(req.body.until_timron_namer_left);
  
    request.until_timron_dahfor_trained = Number(req.body.until_timron_dahfor_trained);
    request.until_timron_dahfor_left = Number(req.body.until_timron_dahfor_left);
  
    request.until_timron_hasz_trained = Number(req.body.until_timron_hasz_trained);
    request.until_timron_hasz_left = Number(req.body.until_timron_hasz_left);
  
    request.from_timron_tank_trained = Number(req.body.from_timron_tank_trained);
    request.from_timron_tank_left = Number(req.body.from_timron_tank_left);
  
    request.from_timron_malar_trained = Number(req.body.from_timron_malar_trained);
    request.from_timron_malar_left = Number(req.body.from_timron_malar_left);
  
    request.from_timron_namer_trained = Number(req.body.from_timron_namer_trained);
    request.from_timron_namer_left = Number(req.body.from_timron_namer_left);
  
    request.from_timron_dahfor_trained = Number(req.body.from_timron_dahfor_trained);
    request.from_timron_dahfor_left = Number(req.body.from_timron_dahfor_left);
  
    request.from_timron_hasz_trained = Number(req.body.from_timron_hasz_trained);
    request.from_timron_hasz_left = Number(req.body.from_timron_hasz_left);
  
    request.tank_fix = Number(req.body.tank_fix);
    request.tank_till_weeks = Number(req.body.tank_till_weeks);
    request.tank_till_month = Number(req.body.tank_till_month);
    request.tank_up_month = Number(req.body.tank_up_month);
    request.tank_long_fix = Number(req.body.tank_long_fix);
  
    request.malar_fix = Number(req.body.malar_fix);
    request.malar_till_weeks = Number(req.body.malar_till_weeks);
    request.malar_till_month = Number(req.body.malar_till_month);
    request.malar_up_month = Number(req.body.malar_up_month);
    request.malar_long_fix = Number(req.body.malar_long_fix);
  
    request.namer_fix = Number(req.body.namer_fix);
    request.namer_till_weeks = Number(req.body.namer_till_weeks);
    request.namer_till_month = Number(req.body.namer_till_month);
    request.namer_up_month = Number(req.body.namer_up_month);
    request.namer_long_fix = Number(req.body.namer_long_fix);
  
    request.dahfor_fix = Number(req.body.dahfor_fix);
    request.dahfor_till_weeks = Number(req.body.dahfor_till_weeks);
    request.dahfor_till_month = Number(req.body.dahfor_till_month);
    request.dahfor_up_month = Number(req.body.dahfor_up_month);
    request.dahfor_long_fix = Number(req.body.dahfor_long_fix);
  
    request.hasz_fix = Number(req.body.hasz_fix);
    request.hasz_till_weeks = Number(req.body.hasz_till_weeks);
    request.hasz_till_month = Number(req.body.hasz_till_month);
    request.hasz_up_month = Number(req.body.hasz_up_month);
    request.hasz_long_fix = Number(req.body.hasz_long_fix);
  
    request.pikod_fix = Number(req.body.pikod_fix);
    request.pikod_till_weeks = Number(req.body.pikod_till_weeks);
    request.pikod_till_month = Number(req.body.pikod_till_month);
    request.pikod_up_month = Number(req.body.pikod_up_month);
    request.pikod_long_fix = Number(req.body.pikod_long_fix);
  
    request.egad_fix = Number(req.body.egad_fix);
    request.egad_till_weeks = Number(req.body.egad_till_weeks);
    request.egad_till_month = Number(req.body.egad_till_month);
    request.egad_up_month = Number(req.body.egad_up_month);
    request.egad_long_fix = Number(req.body.egad_long_fix);
  
    request.masha_fix = Number(req.body.masha_fix);
    request.masha_till_weeks = Number(req.body.masha_till_weeks);
    request.masha_till_month = Number(req.body.masha_till_month);
    request.masha_up_month = Number(req.body.masha_up_month);
    request.masha_long_fix = Number(req.body.masha_long_fix);
  
    request.katrapiler_fix = Number(req.body.katrapiler_fix);
    request.katrapiler_till_weeks = Number(req.body.katrapiler_till_weeks);
    request.katrapiler_till_month = Number(req.body.katrapiler_till_month);
    request.katrapiler_up_month = Number(req.body.katrapiler_up_month);
    request.katrapiler_long_fix = Number(req.body.katrapiler_long_fix);
  
    request.nt_trained = Number(req.body.nt_trained);
    request.nt_treatment = Number(req.body.nt_treatment);
    request.nt_shutdown = Number(req.body.nt_shutdown);
  
    request.mtan_trained = Number(req.body.mtan_trained);
    request.mtan_treatment = Number(req.body.mtan_treatment);
    request.mtan_shutdown = Number(req.body.mtan_shutdown);
  
    request.pazmar_trained = Number(req.body.pazmar_trained);
    request.pazmar_treatment = Number(req.body.pazmar_treatment);
    request.pazmar_shutdown = Number(req.body.pazmar_shutdown);
  
    request.fire_trained = Number(req.body.fire_trained);
    request.fire_treatment = Number(req.body.fire_treatment);
    request.fire_shutdown = Number(req.body.fire_shutdown);
  
    request.reversal_trained = Number(req.body.reversal_trained);
    request.reversal_treatment = Number(req.body.reversal_treatment);
    request.reversal_shutdown = Number(req.body.reversal_shutdown);
  
    request.other_trained = Number(req.body.other_trained);
    request.other_treatment = Number(req.body.other_treatment);
    request.other_shutdown = Number(req.body.other_shutdown);
  
    request.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
  });
};

exports.remove = (req, res) => {
    ArchivedDamagedTools.findByIdAndDelete(req.params.id)
    .then((archiveddamagedtools) => res.json(archiveddamagedtools))
    .catch((err) => res.status(400).json("Error: " + err));
};

