//userid
//array of outlet [id]
//aaray of branch [id]

//productHistoryHistoryid
//status
//userid

const mongoose = require("mongoose");

const userFavoriteSchema = new mongoose.Schema({
  favorite_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  isBranch: {
    type: Boolean,
    required: true,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const UserFavorite = mongoose.model("UserFavorite", userFavoriteSchema);
module.exports = UserFavorite;
