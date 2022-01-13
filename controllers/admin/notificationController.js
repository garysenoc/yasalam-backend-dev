const Notification = require("../../models/Notification");
const User = require("../../models/User");
const { Expo } = require("expo-server-sdk");

const getAllNotification = async (req, res) => {
  try {
    const notification = await Notification.find();

    res.status(200).json({
      status: "success",
      results: notification.length,
      data: {
        notification,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
const d = new Date();

const getNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        notification,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createNotification = async (req, res) => {
  try {
    const newNotification = await Notification.create(req.body);
    const message = req.body.message;
    const title = req.body.title;
    const user = await User.find();

    for (let i in user) {
      const expo = new Expo();
      const chunks = expo.chunkPushNotifications([
        {
          to: user[i].notificationToken,
          sound: "default",
          body: message,
          title: title,
        },
      ]);
    }

    res.status(201).json({
      status: "success",
      data: {
        newNotification,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: `Successfully deleted`,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = {
  getAllNotification,
  getNotification,
  createNotification,
  deleteNotification,
};
