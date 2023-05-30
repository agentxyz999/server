const express = require("express");
const router = express.Router();

const { createTour, getTours } = require("../controllers/toursController");

//endppoints
router.route("/").get(getTours).post(createTour);

module.exports = router;
