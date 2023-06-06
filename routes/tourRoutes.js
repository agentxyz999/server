const express = require("express");
const router = express.Router();

const {
  createTour,
  getTours,
  getTour,
  updateTour,
  deleteTour,
  deleteAllTour,
} = require("../controllers/toursController");

//endppoints
router.route("/").get(getTours).post(createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

router.route("/").delete(deleteAllTour);

module.exports = router;
