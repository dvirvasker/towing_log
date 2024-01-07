const NesoaShchika = require("../../models/nesoashchika/nesoashchika");

exports.find = (req, res) => {
    NesoaShchika.find((err, nesoashchika) => {
    if (err) res.send(err);
    res.json(nesoashchika);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
    NesoaShchika.findById(req.params.id, (err, nesoashchika) => {
    if (err) res.send(err);
    res.json(nesoashchika);
  });
};

exports.read = async (req, res) => {
    NesoaShchika.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const c4_km_day = Number(req.body.c4_km_day);
  const c3_km_day = Number(req.body.c3_km_day);
  const namer_km_day = Number(req.body.namer_km_day);
  const puma_km_day = Number(req.body.puma_km_day);
  const ahzarit_km_day = Number(req.body.ahzarit_km_day);

  const c4_km_avg = Number(req.body.c4_km_avg);
  const c3_km_avg = Number(req.body.c3_km_avg);
  const namer_km_avg = Number(req.body.namer_km_avg);
  const puma_km_avg = Number(req.body.puma_km_avg);
  const ahzarit_km_avg = Number(req.body.ahzarit_km_avg);

  const c4_sham_avg = Number(req.body.c4_sham_avg);
  const c3_sham_avg = Number(req.body.c3_sham_avg);
  const namer_sham_avg = Number(req.body.namer_sham_avg);
  const puma_sham_avg = Number(req.body.puma_sham_avg);
  const dahforim_sham_avg = Number(req.body.dahforim_sham_avg);

  const c4_tools = Number(req.body.c4_tools);
  const c3_bz_tools = Number(req.body.c3_bz_tools);
  const c3_rmh_tools = Number(req.body.c3_rmh_tools);
  const namer_tools = Number(req.body.namer_tools);
  const dahforim_tools = Number(req.body.dahforim_tools);

  const c4_tools_damaged = Number(req.body.c4_tools_damaged);
  const c3_bz_tools_damaged = Number(req.body.c3_bz_tools_damaged);
  const c3_rmh_tools_damaged = Number(req.body.c3_rmh_tools_damaged);
  const namer_tools_damaged = Number(req.body.namer_tools_damaged);
  const dahforim_tools_damaged = Number(req.body.dahforim_tools_damaged);

  const c4_hatak = Number(req.body.c4_hatak);
  const c3_hatak = Number(req.body.c3_hatak);
  const namer_hatak = Number(req.body.namer_hatak);
  const dahforim_hatak = Number(req.body.dahforim_hatak);

  const c4_bakash = Number(req.body.c4_bakash);
  const c3_bakash = Number(req.body.c3_bakash);
  const namer_bakash = Number(req.body.namer_bakash);
  const dahforim_bakash = Number(req.body.dahforim_bakash);

  const c4_coat = Number(req.body.c4_coat);
  const c3_coat = Number(req.body.c3_coat);
  const namer_coat = Number(req.body.namer_coat);
  const dahforim_coat = Number(req.body.dahforim_coat);

  const c4_end = Number(req.body.c4_end);
  const c3_end = Number(req.body.c3_end);
  const namer_end = Number(req.body.namer_end);
  const dahforim_end = Number(req.body.dahforim_end);

  const c4_kanim = Number(req.body.c4_end);
  const c3_kanim = Number(req.body.c3_end);
  const namer_kanim = Number(req.body.namer_end);
  const dahforim_kanim = Number(req.body.dahforim_end);

  const nesoashchika = new NesoaShchika({
    c4_km_day,
    c3_km_day,
    namer_km_day,
    puma_km_day,
    ahzarit_km_day,

    c4_km_avg,
    c3_km_avg,
    namer_km_avg,
    puma_km_avg,
    ahzarit_km_avg,

    c4_sham_avg,
    c3_sham_avg,
    namer_sham_avg,
    puma_sham_avg,
    dahforim_sham_avg,

    c4_tools,
    c3_bz_tools,
    c3_rmh_tools,
    namer_tools,
    dahforim_tools,

    c4_tools_damaged,
    c3_bz_tools_damaged,
    c3_rmh_tools_damaged,
    namer_tools_damaged,
    dahforim_tools_damaged,

    c4_hatak,
    c3_hatak,
    namer_hatak,
    dahforim_hatak,

    c4_bakash,
    c3_bakash,
    namer_bakash,
    dahforim_bakash,

    c4_coat,
    c3_coat,
    namer_coat,
    dahforim_coat,

    c4_end,
    c3_end,
    namer_end,
    dahforim_end,

    c4_kanim,
    c3_kanim,
    namer_kanim,
    dahforim_kanim,

  });
  nesoashchika.save((err, data) => {
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
  NesoaShchika.findById(req.params.id).then((request) => {
    request.c4_km_day = Number(req.body.c4_km_day);
    request.c3_km_day = Number(req.body.c3_km_day);
    request.namer_km_day = Number(req.body.namer_km_day);
    request.puma_km_day = Number(req.body.puma_km_day);
    request.ahzarit_km_day = Number(req.body.ahzarit_km_day);

    request.c4_km_avg = Number(req.body.c4_km_avg);
    request.c3_km_avg = Number(req.body.c3_km_avg);
    request.namer_km_avg = Number(req.body.namer_km_avg);
    request.puma_km_avg = Number(req.body.puma_km_avg);
    request.ahzarit_km_avg = Number(req.body.ahzarit_km_avg);

    request.c4_sham_avg = Number(req.body.c4_sham_avg);
    request.c3_sham_avg = Number(req.body.c3_sham_avg);
    request.namer_sham_avg = Number(req.body.namer_sham_avg);
    request.puma_sham_avg = Number(req.body.puma_sham_avg);
    request.dahforim_sham_avg = Number(req.body.dahforim_sham_avg);

    request.c4_tools = Number(req.body.c4_tools);
    request.c3_bz_tools = Number(req.body.c3_bz_tools);
    request.c3_rmh_tools = Number(req.body.c3_rmh_tools);
    request.namer_tools = Number(req.body.namer_tools);
    request.dahforim_tools = Number(req.body.dahforim_tools);

    request.c4_tools_damaged = Number(req.body.c4_tools_damaged);
    request.c3_bz_tools_damaged = Number(req.body.c3_bz_tools_damaged);
    request.c3_rmh_tools_damaged = Number(req.body.c3_rmh_tools_damaged);
    request.namer_tools_damaged = Number(req.body.namer_tools_damaged);
    request.dahforim_tools_damaged = Number(req.body.dahforim_tools_damaged);

    request.c4_hatak = Number(req.body.c4_hatak);
    request.c3_hatak = Number(req.body.c3_hatak);
    request.namer_hatak = Number(req.body.namer_hatak);
    request.dahforim_hatak = Number(req.body.dahforim_hatak);

    request.c4_bakash = Number(req.body.c4_bakash);
    request.c3_bakash = Number(req.body.c3_bakash);
    request.namer_bakash = Number(req.body.namer_bakash);
    request.dahforim_bakash = Number(req.body.dahforim_bakash);

    request.c4_coat = Number(req.body.c4_coat);
    request.c3_coat = Number(req.body.c3_coat);
    request.namer_coat = Number(req.body.namer_coat);
    request.dahforim_coat = Number(req.body.dahforim_coat);

    request.c4_end = Number(req.body.c4_end);
    request.c3_end = Number(req.body.c3_end);
    request.namer_end = Number(req.body.namer_end);
    request.dahforim_end = Number(req.body.dahforim_end);

    request.c4_kanim = Number(req.body.c4_kanim);
    request.c3_kanim = Number(req.body.c3_kanim);
    request.namer_kanim = Number(req.body.namer_kanim);
    request.dahforim_kanim = Number(req.body.dahforim_kanim);

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
    NesoaShchika.findByIdAndDelete(req.params.id)
    .then((nesoashchika) => res.json(nesoashchika))
    .catch((err) => res.status(400).json("Error: " + err));
};

