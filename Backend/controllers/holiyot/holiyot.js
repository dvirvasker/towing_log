const Holiyot = require("../../models/holiyot/holiyot");

exports.find = (req, res) => {
  Holiyot.findOne((err, holiyot) => {
    if (err) res.send(err);
    res.json(holiyot);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  Holiyot.findById(req.params.id, (err, holiyot) => {
    if (err) res.send(err);
    res.json(holiyot);
  });
};

exports.read = async (req, res) => {
  Holiyot.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const personalnumber = req.body.personalnumber;
  const date_update = req.body.date_update;
  const eged = req.body.eged;
  const hatal = req.body.hatal;
  const masha = req.body.masha;
  const rapat = req.body.rapat;

  const holiyot = new Holiyot({
    personalnumber,
    date_update,
    eged,
    hatal,
    masha,
    rapat,
  });
  holiyot.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  Holiyot.findOne().then((request) => {
    request.personalnumber = req.body.personalnumber;
    request.date_update = req.body.date_update;
    request.eged = req.body.eged;
    request.hatal = req.body.hatal;
    request.masha = req.body.masha;
    request.rapat = req.body.rapat;

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
  Holiyot.findByIdAndDelete(req.params.id)
    .then((holiyot) => res.json(holiyot))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findbypersonalnumber = (req, res) => {
  Holiyot.find({ personalnumber: req.params.id })
    .then((holiyot) => res.json(holiyot))
    .catch((err) => res.status(400).json("Error: " + err));
};
