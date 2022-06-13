class APIFeatures {
  constructor(mongoQueryObject, requestQueryObject) {
    this.mongoQueryObject = mongoQueryObject;
    this.requestQueryObject = requestQueryObject;
  }

  // FIELDS LIMITING
  limitFields() {
    const { fields } = this.requestQueryObject;

    if (fields) {
      this.mongoQueryObject = this.mongoQueryObject.select(
        fields.split(',').join(' ')
      );
    } else {
      this.mongoQueryObject = this.mongoQueryObject.select('-__v');
    }
    return this;
  }

  // PAGINATION
  paginate() {
    const page = this.requestQueryObject.page * 1 || 1;
    const limit = this.requestQueryObject.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.mongoQueryObject = this.mongoQueryObject.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
