const Civilindustry = require("../../models/civilindustry/civilindustryArchive");

exports.find = (req, res) => {
  Civilindustry.findOne((err, civilindustry) => {
    if (err) res.send(err);
    res.json(civilindustry);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  Civilindustry.findById(req.params.id, (err, civilindustry) => {
    if (err) res.send(err);
    res.json(civilindustry);
  });
};

exports.read = async (req, res) => {
  Civilindustry.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const personalnumber = req.body.personalnumber;
  const date_update = req.body.date_update;

  const batashVeKravi = req.body.batashVeKravi;
  const trucksAndMinhala = req.body.trucksAndMinhala;
  const ztmaVeMi = req.body.ztmaVeMi;
  const merkazHovala = req.body.merkazHovala;
  const pikudHaoref = req.body.pikudHaoref;
  const hatal = req.body.hatal;
  const masha = req.body.masha;
  const maharas = req.body.maharas;
  const krtfilerVeZoko = req.body.krtfilerVeZoko;
  const machpileKoach = req.body.machpileKoach;
  const tosefetHozit = req.body.tosefetHozit;
  const mifalimMerotakim = req.body.mifalimMerotakim;

  const civilindustry = new Civilindustry({
    personalnumber,
    date_update,
    batashVeKravi,
    trucksAndMinhala,
    ztmaVeMi,
    merkazHovala,
    pikudHaoref,
    hatal,
    masha,
    maharas,

    krtfilerVeZoko,
    machpileKoach,
    tosefetHozit,
    mifalimMerotakim,
  });
  civilindustry.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  Civilindustry.findById(req.params.id).then((request) => {
    request.personalnumber = req.body.personalnumber;
    request.date_update = req.body.date_update;

    request.batashVeKravi = req.body.batashVeKravi;
    request.trucksAndMinhala = req.body.trucksAndMinhala;
    request.ztmaVeMi = req.body.ztmaVeMi;
    request.merkazHovala = req.body.merkazHovala;
    request.pikudHaoref = req.body.pikudHaoref;
    request.hatal = req.body.hatal;
    request.masha = req.body.masha;
    request.maharas = req.body.maharas;
    request.krtfilerVeZoko = req.body.krtfilerVeZoko;
    request.machpileKoach = req.body.machpileKoach;
    request.tosefetHozit = req.body.tosefetHozit;
    request.mifalimMerotakim = req.body.mifalimMerotakim;

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
  Civilindustry.findByIdAndDelete(req.params.id)
    .then((civilindustry) => res.json(civilindustry))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findbypersonalnumber = (req, res) => {
  Civilindustry.find({ personalnumber: req.params.id })
    .then((civilindustry) => res.json(civilindustry))
    .catch((err) => res.status(400).json("Error: " + err));
};
