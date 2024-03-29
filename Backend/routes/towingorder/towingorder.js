const express = require("express");
const router = express.Router();
const {
  create,
  find,
  read,
  update,
  remove,
  findbypersonalnumber,
} = require("../../controllers/towingorder/towingorder.js");

// find spec
router.put("/remove/:id", remove);
router.get("/:id", read);
router.post("/add", create);
router.post("/update/:id", update);
router.get("/", find);
router.get("/personalnumber/:id", findbypersonalnumber);

module.exports = router;
