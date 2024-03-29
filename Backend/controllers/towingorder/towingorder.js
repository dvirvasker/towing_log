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
  console.log(req.body);
  const reference = req.body.reference;
  const orderDate = req.body.orderDate;
  const orderTime = req.body.orderTime;
  const personalnumber = req.body.personalnumber;
  const serviceName = req.body.serviceName;
  const ahmashNotes = req.body.ahmashNotes;

  const clientJourneyArray = [];
  if (req.body.clientJourney.length !== 0) {
    req.body.clientJourney.forEach((element) => {
      const journey = {
        text: element.text,
        publisher: element.publisher,
        date: element.date,
        published: element.published,
      };
      clientJourneyArray.push(journey);
    });
  }
  const clientJourney = clientJourneyArray;

  const carnumber = req.body.carnumber;

  const erorrInfoArray = [];
  if (req.body.erorrInfo.length !== 0) {
    req.body.erorrInfo.forEach((element) => {
      erorrInfoArray.push(element);
    });
  }
  const erorrInfo = erorrInfoArray;

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
  const isYaram = req.body.isYaram;

  const gdodId = isYaram ? req.body.gdodId : undefined;

  let dates = {};
  if(status === "פתוח")
  {
    dates.openOrderTime = new Date();
  }
  else if(status === "ממתין לאישור")
  {
    dates.waitForApproveTime = new Date();
  }
  else if(status === "סגור")
  {
    dates.closeOrderTime = new Date();
  }

  const towingorder = new TowingOrder({
    ...dates,
    reference,
    orderDate,
    orderTime,
    personalnumber,
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
    isYaram,
    gdodId,
  });
  // console.log(towingorder);
  towingorder.save((err, data) => {
    if (err) {
      console.log("error is: ")
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.update = (req, res) => {
  TowingOrder.findById(req.params.id).then((request) => {
    const previousStatus = request.status;

    request.reference = req.body.reference;
    request.orderDate = req.body.orderDate;
    request.orderTime = req.body.orderTime;
    request.personalnumber = req.body.personalnumber;
    request.serviceName = req.body.serviceName;
    request.ahmashNotes = req.body.ahmashNotes;

    const clientJourneyArray = [];
    if (req.body.clientJourney.length !== 0) {
      req.body.clientJourney.forEach((element) => {
        const journey = {
          text: element.text,
          publisher: element.publisher,
          date: element.date,
          published: element.published,
        };
        clientJourneyArray.push(journey);
      });
    }
    request.clientJourney = clientJourneyArray;
    request.carnumber = req.body.carnumber;

    const erorrInfoArray = [];
    if (req.body.erorrInfo.length !== 0) {
      req.body.erorrInfo.forEach((element) => {
        erorrInfoArray.push(element);
      });
    }

    request.erorrInfo = erorrInfoArray;
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
    request.isYaram = req.body.isYaram;
    request.gdodId = req.body.gdodId;

    /// updating open order time
    if(req.body.status === "פתוח" && previousStatus !== "פתוח")
    {
      request.openOrderTime = new Date();
    }

    /// updating wait for approve time 
    if(req.body.status === "ממתין לאישור" && previousStatus !== "ממתין לאישור")
    {
      request.waitForApproveTime = new Date();
    }

    // updating close order time
    if(req.body.status === "סגור" && previousStatus !== "סגור")
    {
      request.closeOrderTime = new Date();
    }

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
