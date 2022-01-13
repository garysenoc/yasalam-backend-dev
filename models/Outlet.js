const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const outletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "User must have a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  gallery: {
    type: [String],
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
  },
  video: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  email: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  youtube: {
    type: String,
  },
  instagram: {
    type: String,
  },
  whatsapp: {
    type: String,
  },
  havePromo: {
    type: Boolean,
    default: false,
  },
  feature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature",
  },
  rating: {
    type: Number,
    default: 5.0,
  },
});

const Outlet = mongoose.model("Outlet", outletSchema);

module.exports = Outlet;
