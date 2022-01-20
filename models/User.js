const mongoose = require("mongoose");

const { childSchema } = require("./Children");

// name
// bday

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
    unique: true,
    trim: true,
  },
  nationality: {
    type: String,
  },
  mobileNumber: {
    type: String,
    required: [true, "User must have a mobile number"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "User must have a email"],
    unique: true,
  },
  employerDetails: {
    type: String,
    required: [true, "User must have a employer details"],
    trim: true,
  },
  birthdate: {
    type: Date,
    required: [true, "User must have birthdate"],
  },
  userType: {
    // Guest | Individual | Main | Secondary
    type: String,
    required: true,
  },

  mainID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  isSecondaryActive: {
    type: Boolean,
    default: false,
  },
  children: {
    type: [childSchema],
    default: [],
    max: 3,
  },

  points: {
    type: Number,
    default: 0.0,
  },
  savings: {
    type: Number,
    default: 0.0,
  },
  issueDate: {
    type: Date,
    default: Date.now(),
  },
  expiryDate: {
    type: Date,
  },
  otp: {
    type: String,
  },
  isActivate: {
    type: Boolean,
    default: false,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
  },
  userMain: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  notificationToken: {
    type: String,
    default: "",
  },
  day: {
    type: String,
  },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
  frontimageID: {
    type: String,
    required: true,
  },
  backimageID: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
