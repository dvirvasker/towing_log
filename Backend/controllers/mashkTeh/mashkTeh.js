const MashkTeh = require("../../models/mashkTeh/mashkTeh");

exports.find = (req, res) => {
  MashkTeh.findOne((err, mashkTeh) => {
    if (err) res.send(err);
    res.json(mashkTeh);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  MashkTeh.findById(req.params.id, (err, mashkTeh) => {
    if (err) res.send(err);
    res.json(mashkTeh);
  });
};

exports.read = async (req, res) => {
  MashkTeh.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  
  const hatcim = req.body.hatcim;
  const hatcim_kshirot = req.body.hatcim_kshirot;
  const bkhas = req.body.bkhas;
  const bkhas_kshirot = req.body.bkhas_kshirot;
  const malar = req.body.malar;
  const malar_kshirot = req.body.malar_kshirot;
  const malarCars = req.body.malarCars;
  const malarCars_kshirot = req.body.malarCars_kshirot;
  const departments_caza = req.body.departments_caza;
  const migunim = req.body.migunim;
  const Pergolas = req.body.Pergolas;

  const pikodZafon_totalNum = req.body.pikodZafon_totalNum;
  const pikodZafon_totalNum_kshirot = req.body.pikodZafon_totalNum_kshirot;
  const pikodDarom_totalNum = req.body.pikodDarom_totalNum;
  const pikodDarom_totalNum_kshirot = req.body.pikodDarom_totalNum_kshirot;


  const raklar = req.body.raklar;
  const lhat = req.body.lhat;
  const nativ_hasra = req.body.nativ_hasra;
  const robotics = req.body.robotics;
  const barack = req.body.barack;
  
  const life_support = req.body.life_support;
  const bow = req.body.bow;
  const windbreaker = req.body.windbreaker;
  const hanit = req.body.hanit;

  const dummy_platforms = req.body.dummy_platforms;
  const rear_line_platforms = req.body.rear_line_platforms;
  const rock_pos = req.body.rock_pos;
  const outpost_defenses = req.body.outpost_defenses;


  const mashkTeh = new MashkTeh({
    hatcim,
    hatcim_kshirot,
    bkhas,
    bkhas_kshirot,
    malar,
    malar_kshirot,
    malarCars,
    malarCars_kshirot,
    departments_caza,
    migunim,
    Pergolas,

    pikodZafon_totalNum,
    pikodZafon_totalNum_kshirot,
    pikodDarom_totalNum,
    pikodDarom_totalNum_kshirot,

    raklar,
    lhat,
    nativ_hasra,
    robotics,
    barack,

    life_support,
    bow,
    windbreaker,
    hanit,

    dummy_platforms,
    rear_line_platforms,
    rock_pos,
    outpost_defenses,
  });
  mashkTeh.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.update = (req, res) => {
  MashkTeh.findOne().then((request) => {
    request.hatcim = req.body.hatcim;
    request.hatcim_kshirot = req.body.hatcim_kshirot;
    request.bkhas = req.body.bkhas;
    request.bkhas_kshirot = req.body.bkhas_kshirot;
    request.malar = req.body.malar;
    request.malar_kshirot = req.body.malar_kshirot;
    request.malarCars = req.body.malarCars;
    request.malarCars_kshirot = req.body.malarCars_kshirot;
    request.departments_caza = req.body.departments_caza;
    request.migunim = req.body.migunim;
    request.Pergolas = req.body.Pergolas;
  
    request.pikodZafon_totalNum = req.body.pikodZafon_totalNum;
    request.pikodZafon_totalNum_kshirot = req.body.pikodZafon_totalNum_kshirot;
    request.pikodDarom_totalNum = req.body.pikodDarom_totalNum;
    request.pikodDarom_totalNum_kshirot = req.body.pikodDarom_totalNum_kshirot;

    request.raklar = req.body.raklar;
    request.lhat = req.body.lhat;
    request.nativ_hasra = req.body.nativ_hasra;
    request.robotics = req.body.robotics;
    request.barack = req.body.barack;

    request.life_support = req.body.life_support;
    request.bow = req.body.bow;
    request.windbreaker = req.body.windbreaker;
    request.hanit = req.body.hanit;

    request.dummy_platforms = req.body.dummy_platforms;
    request.rear_line_platforms = req.body.rear_line_platforms;
    request.rock_pos = req.body.rock_pos;
    request.outpost_defenses = req.body.outpost_defenses;

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
  MashkTeh.findByIdAndDelete(req.params.id)
    .then((mashkTeh) => res.json(mashkTeh))
    .catch((err) => res.status(400).json("Error: " + err));
};

