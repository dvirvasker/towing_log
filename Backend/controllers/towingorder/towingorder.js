const TowingOrder = require("../../models/towingOrder/towingOrder");

exports.find = (req, res) => {
  TowingOrder.find((err, towingorder) => {
    if (err) res.send(err);
    res.json(towingorder);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  TowingOrder.findById(req.params.id, (err, towingorder) => {
    if (err) res.send(err);
    res.json(towingorder);
  });
};

exports.read = async (req, res) => {
  TowingOrder.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const reference = req.body.reference;
  const orderDate = req.body.orderDate;
  const orderTime = req.body.orderTime;
  const serviceName = req.body.serviceName;
  const ahmashNotes = req.body.ahmashNotes;
  const clientJourney = req.body.clientJourney;
  const carnumber = req.body.carnumber;
  const erorrInfo = req.body.erorrInfo;
  const errInfoOther = req.body.errInfoOther;
  const location = req.body.location;
  const garage = req.body.garage;
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const otherPhoneNumber = req.body.otherPhoneNumber;
  const transferOrderDate = req.body.transferOrderDate;
  const transferOrderTime = req.body.transferOrderTime;
  const reciveName = req.body.reciveName;
  const executiveBody = req.body.executiveBody;
  const turnNumber = req.body.turnNumber;
  const demandDate = req.body.demandDate;
  const area = req.body.area;
  const status = req.body.status;
  const commanderNotes = req.body.commanderNotes;

  const towingorder = new TowingOrder({
    reference,
    orderDate,
    orderTime,
    serviceName,
    ahmashNotes,
    clientJourney,
    carnumber,
    erorrInfo,
    errInfoOther,
    location,
    garage,
    fullName,
    phoneNumber,
    otherPhoneNumber,
    transferOrderDate,
    transferOrderTime,
    reciveName,
    executiveBody,
    turnNumber,
    demandDate,
    area,
    status,
    commanderNotes,
  });
  towingorder.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  TowingOrder.findOne().then((request) => {
    request.reference = req.body.reference;
    request.orderDate = req.body.orderDate;
    request.orderTime = req.body.orderTime;
    request.serviceName = req.body.serviceName;
    request.ahmashNotes = req.body.ahmashNotes;
    request.clientJourney = req.body.clientJourney;
    request.carnumber = req.body.carnumber;
    request.erorrInfo = req.body.erorrInfo;
    request.errInfoOther = req.body.errInfoOther;
    request.location = req.body.location;
    request.garage = req.body.garage;
    request.fullName = req.body.fullName;
    request.phoneNumber = req.body.phoneNumber;
    request.otherPhoneNumber = req.body.otherPhoneNumber;
    request.transferOrderDate = req.body.transferOrderDate;
    request.transferOrderTime = req.body.transferOrderTime;
    request.reciveName = req.body.reciveName;
    request.executiveBody = req.body.executiveBody;
    request.turnNumber = req.body.turnNumber;
    request.demandDate = req.body.demandDate;
    request.area = req.body.area;
    request.status = req.body.status;
    request.commanderNotes = req.body.commanderNotes;

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
  TowingOrder.findByIdAndDelete(req.params.id)
    .then((towingorder) => res.json(towingorder))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findbypersonalnumber = (req, res) => {
  TowingOrder.find({ personalnumber: req.params.id })
    .then((towingorder) => res.json(towingorder))
    .catch((err) => res.status(400).json("Error: " + err));
};
