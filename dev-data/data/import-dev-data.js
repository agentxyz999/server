/* ------------------------------------------------------------------------------
** in order to run this in command line,                                    *****
** type 
**     node dev-data/data/import-dev-data --import to import all data to DB *****
** OR
**     node dev-data/data/import-dev-data --delete to delete all data from DB ***
--------------------------------------------------------------------------------*/
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const Tour = require("../../model/tourModel");

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

//Read tours JSON File
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"));

//Import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//Delete data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data deleted");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
// console.log(process.argv);
