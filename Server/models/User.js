const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "MissingEmail"],
    unique: [true, "TakenEmail"],
    lowercase: true,
    validate: [validator.isEmail, "UnvalidEmail"],
  },
  password: {
    type: String,
    minlength: [8, "ShortPassword"],
    required: [true, "MissingPassword"],
  },
  name: {
    type: String,
    required: [true, "MissingName"],
  },
  surname: {
    type: String,
    required: [true, "MissingSurname"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "none"],
    default: "none",
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    number: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
