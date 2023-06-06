const express = require("express");
const router = express.Router();

const { createTour, getTours, getTour, updateTour, deleteTour } = require("../controllers/toursController");

//endppoints
router.route("/").get(getTours).post(createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
