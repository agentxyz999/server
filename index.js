const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const tourRoutes = require("./routes/tourRoutes");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

//api endpoints
app.use("/api/v1/tours", tourRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database successfully connected!");
  })
  .catch((err) => {
    console.log("Unable to connect to database!", err.message);
  });

//start the server and listen for incoming request on port specified
const server = app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
