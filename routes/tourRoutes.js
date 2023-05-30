const express = require("express");
const { createTour } = require("../controllers/toursController");

const router = express.Router();

//endppoints
router.route("/").post(createTour);

module.exports = router;
