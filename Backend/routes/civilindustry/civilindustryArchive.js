const express = require("express");
const router = express.Router();
const {
  create,
  find,
  read,
  update,
  remove,
  findbypersonalnumber,
} = require("../../controllers/civilindustry/civilindustryArchive.js");

// find spec
router.put("/remove/:id", remove);
router.get("/:id", read);
router.post("/add", create);
router.post("/update", update);
router.get("/", find);
router.get("/personalnumber/:id", findbypersonalnumber);

module.exports = router;
