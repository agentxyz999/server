const Tour = require("../model/tourModel");

//Get Top 5 Best Tours
exports.topFiveBest = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage, price";
  req.query.fields = "name, price, ratingsAverage, summary, difficulty";
  next();
};

//GET ALL TOURS
exports.getTours = async (req, res) => {
  try {
    //BUILD THE QUERY
    // 1.1 FILTERING : filter the queryObj by deleting keys in queryObj
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "sort", "fields"].forEach((el) => delete queryObj[el]);

    // 1.2 ADVANCE FILTERING : Filter the gte, gt, lte, lt using REGEX
    const queryStr = JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    // 2. SORTING : If the client requested Sorting
    if (req.query.sort) {
      //To convert to Mongo syntax i.e(price, maxGroupSize) => (price maxGroupSize)
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else query = query.sort("-createdAt");

    // 3. FIELD LIMITING(Projecting): Limiting the response
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else query = query.select("-__v"); //this will exclude the "__v" field from MongoDB

    // 4. Pagination
    const page = req.query.page * 1 || 1; //convert the query string to number
    const limit = req.query.limit * 1 || 100; //convert the query string to number
    const skip = (page - 1) * limit;
    //tours?page=2&limit=10 PAGE 1(1-10), PAGE 2(11-20), PAGE 3(21-30)
    query = query.skip(skip).limit(limit);

    //EXECUTE THE QUERY
    const tours = await query;

    //SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

//GET A TOUR BY ID
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      results: tour.length,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

//CREATE NEW TOUR
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

//UPDATE A TOUR BY ID
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //return the modified doc rather than the original
      runValidators: true, //this will validate the update operation against the model's schema
    });
    res.status(200).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

//DELETE A TOUR
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
};
//DELETE ALL TOURS
exports.deleteAllTour = async (req, res) => {
  try {
    await Tour.deleteMany();
    res.status(204).json({
      status: "Success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
};
