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
  const weight = req.body.weight;

  const cardatas = new CarDatas({
    carnumber,
    gdodId,
    makatId,
    carTypeId,
    weight,
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

exports.findByCarNumberAndUpdate = (req, res) => {
  CarDatas.findOne({carnumber : req.params.carnumber}).then((request) => {
    request.gdodId = req.body.gdodId ? req.body.gdodId : request.gdodId;
    request.makatId = req.body.makatId ? req.body.makatId : request.makatId;
    request.carTypeId = req.body.carTypeId ? req.body.carTypeId : request.carTypeId;
    request.weight = req.body.weight ? req.body.weight : request.weight;

    request.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(data);
    });
  })
}

exports.updateCivilCars = async(req, res) => {
  try
  {
    const cars = req.body.cars;
    for(const car of cars)
    {
      console.log(car);
      const request = await CarDatas.findOne({carnumber : car.carnumber});
        if(request)// updating an existing car
        {
          await CarDatas.findByIdAndUpdate(request.id, {status : car.status})
          // request.status === car.status,
          // request.carTypeId === car.carTypeId,
          // request.weight === car.weight
          // await request.save();
        }
        else// creating a new car
        {
          await CarDatas.create({
            carnumber : car.carnumber,
            carTypeId : car.carTypeId,
            weight : car.weight,
            status : car.status
          });
        }
      }
      res.sendStatus(200);
    }
    catch(err)
    {
      return res.status(400).json({
        error: err,
      });
    }
}

exports.update = (req, res) => {
  CarDatas.findOne().then((request) => {
    request.carnumber = req.body.carnumber;
    request.gdodId = req.body.gdodId;
    request.makatId = req.body.makatId;
    request.carTypeId = req.body.carTypeId;
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
  CarDatas.findByIdAndDelete(req.params.id)
    .then((cardatas) => res.json(cardatas))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.findbypersonalnumber = (req, res) => {
  CarDatas.find({ personalnumber: req.params.id })
    .then((cardatas) => res.json(cardatas))
    .catch((err) => res.status(400).json("Error: " + err));
};
