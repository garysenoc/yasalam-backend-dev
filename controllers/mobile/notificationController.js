const Notification = require("../../models/Notification");
const User = require("../../models/User");

const getAllNotification = async (req, res) => {
  try {
    const notification = await Notification.find().sort({ dateCreated: -1 });

    res.status(200).json({
      status: "success",
      results: notification.length,
      data: {
        notification,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const updateNotificationToken = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const token = req.body.token;

    const updated_user = await User.findByidAndUpdate(
      user_id,
      { notificationToken: token },
      { new: true },
    );

    res.status(200).json({
      status: "success",
      results: notification.length,
      data: {
        updated_user,
      },
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
  updateNotificationToken,
};
