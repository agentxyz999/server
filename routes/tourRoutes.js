const express = require("express");
const router = express.Router();

const {
  createTour,
  getTours,
  getTour,
} = require("../controllers/toursController");

//endppoints
router.route("/").get(getTours).post(createTour);

router.route("/:id").get(getTour);

module.exports = router;
