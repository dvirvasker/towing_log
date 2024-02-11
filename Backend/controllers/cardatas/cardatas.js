const CarDatas = require("../../models/cardatas/cardatas");

exports.find = (req, res) => {
  CarDatas.find((err, cardatas) => {
    if (err) res.send(err);
    res.json(cardatas);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  CarDatas.findById(req.params.id, (err, cardatas) => {
    if (err) res.send(err);
    res.json(cardatas);
  });
};

exports.read = async (req, res) => {
  CarDatas.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const carnumber = req.body.carnumber;
  const gdodId = req.body.gdodId;
  const makatId = req.body.makatId;
  const carTypeId = req.body.carTypeId;

  const cardatas = new CarDatas({
    carnumber,
    gdodId,
    makatId,
    carTypeId,
  });
  cardatas.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  CarDatas.findOne().then((request) => {
    request.carnumber = req.body.carnumber;
    request.gdodId = req.body.gdodId;
    request.makatId = req.body.makatId;
    request.carTypeId = req.body.carTypeId;

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
  CarDatas.findByIdAndDelete(req.params.id)
    .then((cardatas) => res.json(cardatas))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findbypersonalnumber = (req, res) => {
  CarDatas.find({ personalnumber: req.params.id })
    .then((cardatas) => res.json(cardatas))
    .catch((err) => res.status(400).json("Error: " + err));
};
