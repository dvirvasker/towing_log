const KshirotArchive = require("../../models/kshirot/kshirotArchive");

exports.find = (req, res) => {
  KshirotArchive.findOne((err, kshirotArchive) => {
    if (err) res.send(err);
    res.json(kshirotArchive);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  KshirotArchive.findById(req.params.id, (err, kshirotArchive) => {
    if (err) res.send(err);
    res.json(kshirotArchive);
  });
};

exports.read = async (req, res) => {
  KshirotArchive.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create = (req, res) => {
  const weeks_Array  = [];
  req.body.weeksArray.forEach((element) => {
    const weeks ={
       week_name: element.week_name,
       c3: Number(element.c3),
       c4: Number(element.c4),
       namer: Number(element.namer),
       zma: Number(element.zma),
    };
    weeks_Array.push(weeks);
  });

 const weeksArray = weeks_Array;
 const personalnumber = req.body.personalnumber;
 
  const kshirot = new KshirotArchive({
    weeksArray,
    personalnumber,
  });
  kshirot.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.update = (req, res) => {
  KshirotArchive.findOne().then((request) => {
    const weeks_Array  = [];
    req.body.weeksArray.forEach((element) => {
      const weeks ={
         week_name: element.week_name,
         c3: Number(element.c3),
         c4: Number(element.c4),
         namer: Number(element.namer),
         zma: Number(element.zma),
      };
      weeks_Array.push(weeks);
    });
    request.weeksArray = weeks_Array;

    request.personalnumber = req.body.personalnumber;
   

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
  KshirotArchive.findByIdAndDelete(req.params.id)
    .then((kshirotArchive) => res.json(kshirotArchive))
    .catch((err) => res.status(400).json("Error: " + err));
};

