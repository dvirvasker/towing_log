const Personnel = require("../../models/personnel/personnel");

exports.find = (req, res) => {
  Personnel.findOne((err, personnel) => {
    if (err) res.send(err);
    res.json(personnel);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  Personnel.findById(req.params.id, (err, personnel) => {
    if (err) res.send(err);
    res.json(personnel);
  });
};

exports.read = async (req, res) => {
  Personnel.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  
  const hova_soldiers = req.body.hova_soldiers;
  const keva = req.body.keva;
  const civilian_employee = req.body.civilian_employee;
  const student = req.body.student;
  const miluim = req.body.miluim;

  const casualty = req.body.casualty;
  const back_to_unit = req.body.back_to_unit;
  const sadir_halalim = req.body.sadir_halalim;
  const miluim_halalim = req.body.miluim_halalim;


  const personnel = new Personnel({
     hova_soldiers ,
     keva ,
     civilian_employee ,
     student ,
     miluim ,
  
     casualty ,
     back_to_unit ,
     sadir_halalim ,
     miluim_halalim ,
  });
  personnel.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.update = (req, res) => {
  Personnel.findOne().then((request) => {
    request.hova_soldiers = req.body.hova_soldiers;
    request.keva = req.body.keva;
    request.civilian_employee = req.body.civilian_employee;
    request.student = req.body.student;
    request.miluim = req.body.miluim;
  
    request.casualty = req.body.casualty;
    request.back_to_unit = req.body.back_to_unit;
    request.sadir_halalim = req.body.sadir_halalim;
    request.miluim_halalim = req.body.miluim_halalim;

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
  Personnel.findByIdAndDelete(req.params.id)
    .then((personnel) => res.json(personnel))
    .catch((err) => res.status(400).json("Error: " + err));
};

