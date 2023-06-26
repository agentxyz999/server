const express = require("express");
const router = express.Router();

const {
  createTour,
  getTours,
  getTour,
  updateTour,
  deleteTour,
  deleteAllTour,
  topFiveBest,
} = require("../controllers/toursController");

//endppoints
router.route("/top-5-best").get(topFiveBest, getTours); //get top 5 best tours based on ratings average

router.route("/").get(getTours).post(createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

router.route("/").delete(deleteAllTour);

module.exports = router;
