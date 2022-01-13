const mongoose = require("mongoose");

const userAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const UserAdmin = mongoose.model("useradmin", userAdminSchema);

module.exports = UserAdmin;
