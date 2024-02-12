const express = require("express");
const router = express.Router();
const {
  create,
  find,
  read,
  update,
  remove,
  updateCivilCars
} = require("../../controllers/cardatas/cardatas.js");

// find spec
router.post('/updateCivilCars', updateCivilCars);
router.put("/remove/:id", remove);
router.get("/:id", read);
router.post("/add", create);
router.post("/update", update);
router.get("/", find);

module.exports = router;
