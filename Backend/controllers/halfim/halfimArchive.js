const HalfimArchive = require("../../models/halfim/halfimArchive");

exports.find = (req, res) => {
  HalfimArchive.findOne((err, halfim) => {
    if (err) res.send(err);
    res.json(halfim);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  HalfimArchive.findById(req.params.id, (err, halfim) => {
    if (err) res.send(err);
    res.json(halfim);
  });
};

exports.read = async (req, res) => {
  HalfimArchive.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const personalnumber = req.body.personalnumber;
  const date_update = req.body.date_update;
  const mk4Number = req.body.mk4Number;
  const malarGinsNumber = req.body.malarGinsNumber;
  const mk3Number = req.body.mk3Number;
  const namerNumber = req.body.namerNumber;
  const pumaNumber = req.body.pumaNumber;
  const achzaritNumber = req.body.achzaritNumber;
  const dahporimNumber = req.body.dahporimNumber;
  const tomatNumber = req.body.tomatNumber;
  const hamerNumber = req.body.hamerNumber;
  const s3ramahHalfim = req.body.s3ramahHalfim;
  const tomatHalfim = req.body.tomatHalfim;
  const s3ramahKshirot = req.body.s3ramahKshirot;
  const trucks = req.body.trucks;
  const itemsInStockZero = req.body.itemsInStockZero;
  const ogda162 = req.body.ogda162;
  const ogda36 = req.body.ogda36;
  const ogda252 = req.body.ogda252;
  const ogda143 = req.body.ogda143;
  const ogda98 = req.body.ogda98;
  const drishotDarom = req.body.drishotDarom;
  const dhiyotDarom = req.body.dhiyotDarom;
  const nipukimDarom = req.body.nipukimDarom;
  const drishotZtafon = req.body.drishotZtafon;
  const dhiyotZtafon = req.body.dhiyotZtafon;
  const nipukimZtafon = req.body.nipukimZtafon;
  const merkavamk4Text = req.body.merkavamk4Text;
  const merkavamk3Text = req.body.merkavamk3Text;
  const tomatText = req.body.tomatText;
  const ginsText = req.body.ginsText;
  const namerText = req.body.namerText;
  const pumaText = req.body.pumaText;
  const achzaritText = req.body.achzaritText;
  const dahpurText = req.body.dahpurText;

  const halfim = new HalfimArchive({
    personalnumber,
    date_update,
    mk4Number,
    malarGinsNumber,
    mk3Number,
    namerNumber,
    pumaNumber,
    achzaritNumber,
    dahporimNumber,
    tomatNumber,
    hamerNumber,
    s3ramahHalfim,
    tomatHalfim,
    s3ramahKshirot,
    trucks,
    itemsInStockZero,
    ogda162,
    ogda36,
    ogda252,
    ogda143,
    ogda98,
    drishotDarom,
    dhiyotDarom,
    nipukimDarom,
    drishotZtafon,
    dhiyotZtafon,
    nipukimZtafon,
    merkavamk4Text,
    merkavamk3Text,
    tomatText,
    ginsText,
    namerText,
    pumaText,
    achzaritText,
    dahpurText,
  });
  halfim.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  HalfimArchive.findById(req.params.id).then((request) => {
    request.personalnumber = req.body.personalnumber;
    request.date_update = req.body.date_update;

    request.mk4Number = req.body.mk4Number;
    request.malarGinsNumber = req.body.malarGinsNumber;
    request.mk3Number = req.body.mk3Number;
    request.namerNumber = req.body.namerNumber;
    request.pumaNumber = req.body.pumaNumber;
    request.achzaritNumber = req.body.achzaritNumber;
    request.dahporimNumber = req.body.dahporimNumber;
    request.tomatNumber = req.body.tomatNumber;
    request.hamerNumber = req.body.hamerNumber;
    request.s3ramahHalfim = req.body.s3ramahHalfim;
    request.tomatHalfim = req.body.tomatHalfim;
    request.s3ramahKshirot = req.body.s3ramahKshirot;
    request.trucks = req.body.trucks;
    request.itemsInStockZero = req.body.itemsInStockZero;
    request.ogda162 = req.body.ogda162;
    request.ogda36 = req.body.ogda36;
    request.ogda252 = req.body.ogda252;
    request.ogda143 = req.body.ogda143;
    request.ogda98 = req.body.ogda98;
    request.drishotDarom = req.body.drishotDarom;
    request.dhiyotDarom = req.body.dhiyotDarom;
    request.nipukimDarom = req.body.nipukimDarom;
    request.drishotZtafon = req.body.drishotZtafon;
    request.dhiyotZtafon = req.body.dhiyotZtafon;
    request.nipukimZtafon = req.body.nipukimZtafon;
    request.merkavamk4Text = req.body.merkavamk4Text;
    request.merkavamk3Text = req.body.merkavamk3Text;
    request.tomatText = req.body.tomatText;
    request.ginsText = req.body.ginsText;
    request.namerText = req.body.namerText;
    request.pumaText = req.body.pumaText;
    request.achzaritText = req.body.achzaritText;
    request.dahpurText = req.body.dahpurText;

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
  HalfimArchive.findByIdAndDelete(req.params.id)
    .then((halfim) => res.json(halfim))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findbypersonalnumber = (req, res) => {
  HalfimArchive.find({ personalnumber: req.params.id })
    .then((halfim) => res.json(halfim))
    .catch((err) => res.status(400).json("Error: " + err));
};
