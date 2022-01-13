const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  code: {
    type: String,
  },
});

const Referral = mongoose.model("Referral", referralSchema);
module.exports = Referral;
