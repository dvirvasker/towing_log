const Militaryindustry = require("../../models/militaryindustry/militaryindustry");

exports.find = (req, res) => {
  Militaryindustry.findOne((err, militaryindustry) => {
    if (err) res.send(err);
    res.json(militaryindustry);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  Militaryindustry.findById(req.params.id, (err, militaryindustry) => {
    if (err) res.send(err);
    res.json(militaryindustry);
  });
};

exports.read = async (req, res) => {
  Militaryindustry.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const personalnumber = req.body.personalnumber;
  const date_update = req.body.date_update;
  const ztakahim = req.body.ztakahim;
  const tvachOgdati = req.body.tvachOgdati;
  const egedTeneVeMerhavim = req.body.egedTeneVeMerhavim;
  const matkaliyot = req.body.matkaliyot;
  const atoda = req.body.atoda;
  const reservationCenters = req.body.reservationCenters;
  const yachsam = req.body.yachsam;
  const pakladVeMesayat = req.body.pakladVeMesayat;
  const unitsMatkaliyot = req.body.unitsMatkaliyot;

  const militaryindustry = new Militaryindustry({
    personalnumber,
    date_update,
    ztakahim,
    tvachOgdati,
    egedTeneVeMerhavim,
    matkaliyot,
    atoda,
    reservationCenters,
    yachsam,
    pakladVeMesayat,
    unitsMatkaliyot,
  });
  militaryindustry.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  Militaryindustry.findOne().then((request) => {
    request.personalnumber = req.body.personalnumber;
    request.date_update = req.body.date_update;

    request.ztakahim = req.body.ztakahim;
    request.tvachOgdati = req.body.tvachOgdati;
    request.egedTeneVeMerhavim = req.body.egedTeneVeMerhavim;
    request.matkaliyot = req.body.matkaliyot;
    request.atoda = req.body.atoda;
    request.reservationCenters = req.body.reservationCenters;
    request.yachsam = req.body.yachsam;
    request.pakladVeMesayat = req.body.pakladVeMesayat;
    request.unitsMatkaliyot = req.body.unitsMatkaliyot;

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
  Militaryindustry.findByIdAndDelete(req.params.id)
    .then((militaryindustry) => res.json(militaryindustry))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findbypersonalnumber = (req, res) => {
  Militaryindustry.find({ personalnumber: req.params.id })
    .then((militaryindustry) => res.json(militaryindustry))
    .catch((err) => res.status(400).json("Error: " + err));
};
