const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
      alias: "user",
    },
    line1: {
      type: String,
    },
    line2: {
      type: String,
    },
    area: {
      type: String,
    },
  },
  { collection: "person" }
);

//! Virtuals
PersonSchema.virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (value) {
    this.firstName = value.substr(0, value.indexOf(" "));
    this.lastName = value.substr(value.indexOf(" ") + 1);
  });

PersonSchema.virtual("address")
  .set(function (value) {
    this.line1 = value.substr(0, value.indexOf(" "));
    this.line2 = value.substr(value.indexOf(" ") + 1, value.lastIndexOf(" "));
    this.area = value.substr(value.lastIndexOf(" ") + 1);
  })
  .get(function () {
    return this.line1 + " " + this.line2 + " " + this.area;
  });

//! Instance Methods
PersonSchema.methods.findSameLastName = function (cb) {
  return mongoose.model("Person").find({ lastName: this.lastName }, cb);
};
const Person = mongoose.model("Person", PersonSchema);

module.exports = { Person };
