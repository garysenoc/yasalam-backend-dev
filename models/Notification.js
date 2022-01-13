const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Notification should have a message"],
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  title: {
    type: String,
    required: [true, "Notification should have a title"],
    trim: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
