const SdacPower = require("../../models/sdacPower/sdacPower");

exports.find = (req, res) => {
  SdacPower.findOne((err, sdacPower) => {
    if (err) res.send(err);
    res.json(sdacPower);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  SdacPower.findById(req.params.id, (err, sdacPower) => {
    if (err) res.send(err);
    res.json(sdacPower);
  });
};

exports.read = async (req, res) => {
  SdacPower.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  
  const darom_tank = req.body.darom_tank;
  const darom_namer = req.body.darom_namer;
  const darom_hashaz = req.body.darom_hashaz;
  const darom_ngmash = req.body.darom_ngmash;
  const darom_tomat = req.body.darom_tomat;
  const darom_zma = req.body.darom_zma;
  const darom_car = req.body.darom_car;

  const merkaz_tank = req.body.merkaz_tank;
  const merkaz_ngmash = req.body.merkaz_ngmash;
  const merkaz_zma = req.body.merkaz_zma;
  const merkaz_car = req.body.merkaz_car;

  const zafon_tank = req.body.zafon_tank;
  const zafon_namer = req.body.zafon_namer;
  const zafon_hashaz = req.body.zafon_hashaz;
  const zafon_ngmash = req.body.zafon_ngmash;
  const zafon_tomat = req.body.zafon_tomat;
  const zafon_zma = req.body.zafon_zma;
  const zafon_car = req.body.zafon_car;

  const sdacPower = new SdacPower({
    darom_tank,
    darom_namer,
    darom_hashaz,
    darom_ngmash,
    darom_tomat,
    darom_zma,
    darom_car,
 
    merkaz_tank,
    merkaz_ngmash,
    merkaz_zma,
    merkaz_car,
 
    zafon_tank,
    zafon_namer,
    zafon_hashaz,
    zafon_ngmash,
    zafon_tomat,
    zafon_zma,
    zafon_car,
  });
  sdacPower.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.update = (req, res) => {
  SdacPower.findOne().then((request) => {
    request.darom_tank = req.body.darom_tank;
    request.darom_namer = req.body.darom_namer;
    request.darom_hashaz = req.body.darom_hashaz;
    request.darom_ngmash = req.body.darom_ngmash;
    request.darom_tomat = req.body.darom_tomat;
    request.darom_zma = req.body.darom_zma;
    request.darom_car = req.body.darom_car;
  
    request.merkaz_tank = req.body.merkaz_tank;
    request.merkaz_ngmash = req.body.merkaz_ngmash;
    request.merkaz_zma = req.body.merkaz_zma;
    request.merkaz_car = req.body.merkaz_car;
  
    request.zafon_tank = req.body.zafon_tank;
    request.zafon_namer = req.body.zafon_namer;
    request.zafon_hashaz = req.body.zafon_hashaz;
    request.zafon_ngmash = req.body.zafon_ngmash;
    request.zafon_tomat = req.body.zafon_tomat;
    request.zafon_zma = req.body.zafon_zma;
    request.zafon_car = req.body.zafon_car;

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
  SdacPower.findByIdAndDelete(req.params.id)
    .then((sdacPower) => res.json(sdacPower))
    .catch((err) => res.status(400).json("Error: " + err));
};

