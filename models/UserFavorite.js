//userid
//array of outlet [id]
//aaray of branch [id]

//productHistoryHistoryid
//status
//userid

const mongoose = require("mongoose");

const userFavoriteSchema = new mongoose.Schema({
  outlet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const UserFavorite = mongoose.model("UserFavorite", userFavoriteSchema);
module.exports = UserFavorite;
