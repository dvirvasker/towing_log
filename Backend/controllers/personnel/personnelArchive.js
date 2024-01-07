const PersonnelArchive = require("../../models/personnel/personnelArchive");

exports.find = (req, res) => {
  PersonnelArchive.findOne((err, personnelArchive) => {
    if (err) res.send(err);
    res.json(personnelArchive);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  PersonnelArchive.findById(req.params.id, (err, personnelArchive) => {
    if (err) res.send(err);
    res.json(personnelArchive);
  });
};

exports.read = async (req, res) => {
  PersonnelArchive.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const personalnumber = req.body.personalnumber;
  const hova_soldiers = req.body.hova_soldiers;
  const keva = req.body.keva;
  const civilian_employee = req.body.civilian_employee;
  const student = req.body.student;
  const miluim = req.body.miluim;
  const totalSolider = req.body.totalSolider;

  const casualty = req.body.casualty;
  const back_to_unit = req.body.back_to_unit;
  const totalHalalim = req.body.totalHalalim;
  const sadir_halalim = req.body.sadir_halalim;
  const miluim_halalim = req.body.miluim_halalim;

  const personnelArchiveArchive = new PersonnelArchive({
    personalnumber,
    hova_soldiers ,
    keva ,
    civilian_employee ,
    student ,
    miluim ,
    totalSolider ,
 
    casualty ,
    back_to_unit ,
    totalHalalim ,
    sadir_halalim ,
    miluim_halalim ,
  });
  personnelArchiveArchive.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.update = (req, res) => {
  PersonnelArchive.findOne().then((request) => {
    request.personalnumber = req.body.personalnumber;
    request.hova_soldiers = req.body.hova_soldiers;
    request.keva = req.body.keva;
    request.civilian_employee = req.body.civilian_employee;
    request.student = req.body.student;
    request.miluim = req.body.miluim;
    request.totalSolider = req.body.totalSolider;
  
    request.casualty = req.body.casualty;
    request.back_to_unit = req.body.back_to_unit;
    request.totalHalalim = req.body.totalHalalim;
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
  PersonnelArchive.findByIdAndDelete(req.params.id)
    .then((personnelArchive) => res.json(personnelArchive))
    .catch((err) => res.status(400).json("Error: " + err));
};

