const mongoose = require("mongoose");

//tour schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, "A tour must have a description"],
    trim: true, //remove all the whitespace in the beginning and end of the string
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String], //type string but an array(array of images)
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, //this will hide the createdAt from client
  },
  startDates: [Date], //type Date but it will be an array of dates
});
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
