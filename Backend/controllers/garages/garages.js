const Garages = require("../../models/garages/garages");

exports.find = (req, res) => {
  Garages.find((err, garages) => {
    if (err) res.send(err);
    res.json(garages);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  Garages.findById(req.params.id, (err, garages) => {
    if (err) res.send(err);
    res.json(garages);
  });
};

exports.read = async (req, res) => {
  Garages.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const garageName = req.body.garageName;
  const garageArea = req.body.garageArea;

  const garages = new Garages({
    garageName,
    garageArea,
  });
  garages.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  Garages.findOne().then((request) => {
    request.garageName = req.body.garageName;
    request.garageArea = req.body.garageArea;

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
  Garages.findByIdAndDelete(req.params.id)
    .then((garages) => res.json(garages))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findbypersonalnumber = (req, res) => {
  Garages.find({ personalnumber: req.params.id })
    .then((garages) => res.json(garages))
    .catch((err) => res.status(400).json("Error: " + err));
};
