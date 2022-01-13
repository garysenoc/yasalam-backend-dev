const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User must have a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    unique: true,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

adminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
