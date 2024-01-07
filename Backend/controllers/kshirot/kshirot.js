const Kshirot = require("../../models/kshirot/kshirot");

exports.find = (req, res) => {
  Kshirot.findOne((err, kshirot) => {
    if (err) res.send(err);
    res.json(kshirot);
  }).sort({ createdAt: -1 });
};

exports.findById = (req, res) => {
  Kshirot.findById(req.params.id, (err, kshirot) => {
    if (err) res.send(err);
    res.json(kshirot);
  });
};

exports.read = async (req, res) => {
  Kshirot.findById(req.params.id)
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

  const kshirot = new Kshirot({
    weeksArray,
   
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
  Kshirot.findOne().then((request) => {
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
  Kshirot.findByIdAndDelete(req.params.id)
    .then((kshirot) => res.json(kshirot))
    .catch((err) => res.status(400).json("Error: " + err));
};

