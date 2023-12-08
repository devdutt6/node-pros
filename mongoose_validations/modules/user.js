const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  line1: {
    type: String,
    required: true,
    default: 0,
  },
  line2: {
    type: String,
    required: true,
    default: 0,
  },
});

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    address: {
      type: AddressSchema,
      default: () => ({}),
    },
  },
  { collection: "user", autoIndex: false }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
