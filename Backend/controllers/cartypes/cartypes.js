const CarTypes = require("../../models/cartypes/cartypes");

exports.find = (req, res) => {
  CarTypes.find((err, cartypes) => {
    if (err) res.send(err);
    res.json(cartypes);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  CarTypes.findById(req.params.id, (err, cartypes) => {
    if (err) res.send(err);
    res.json(cartypes);
  });
};

exports.read = async (req, res) => {
  CarTypes.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const carType = req.body.carType;
  const weight = req.body.weight;

  const cartypes = new CarTypes({
    carType,
    weight,
  });
  cartypes.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  CarTypes.findOne().then((request) => {
    request.carType = req.body.carType;
    request.weight = req.body.weight;

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
  CarTypes.findByIdAndDelete(req.params.id)
    .then((cartypes) => res.json(cartypes))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findbypersonalnumber = (req, res) => {
  CarTypes.find({ personalnumber: req.params.id })
    .then((cartypes) => res.json(cartypes))
    .catch((err) => res.status(400).json("Error: " + err));
};
