class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "fields"].forEach((el) => delete queryObj[el]);
    // const { page, limit, sort, fields, ...queryObj } = this.queryString;
    //we can do this(Line 9) destructuring instead of Lines 7 and 8
    // 1.2 ADVANCE FILTERING : Filter the gte, gt, lte, lt using REGEX
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      //To convert to Mongo syntax i.e(price, maxGroupSize) -> (price maxGroupSize)
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else this.query = this.query.sort("-createdAt");

    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else this.query = this.query.select("-__v"); //this will exclude the "__v" field from MongoDB

    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1; //convert the query string to number
    const limit = this.queryString.limit * 1 || 100; //convert the query string to number
    const skip = (page - 1) * limit;
    //tours?page=2&limit=10 PAGE 1(1-10), PAGE 2(11-20), PAGE 3(21-30)
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
