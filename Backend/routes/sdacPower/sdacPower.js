const express = require("express");
const router = express.Router();
const {
  create,
  find,
  read,
  update,
  remove,
} = require("../../controllers/sdacPower/sdacPower.js");

router.put("/remove/:id", remove);
router.get("/:id", read);
router.post("/add", create);
router.post("/update", update);
router.get("/", find);

module.exports = router;
