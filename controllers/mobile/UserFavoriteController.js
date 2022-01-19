const UserFavorite = require("../../models/UserFavorite");

const bcrypt = require("bcryptjs");

const getAllUserFavorite = async (req, res) => {
  try {
    const UserFavorite = await UserFavorite.find().populate("outlet");

    res.status(200).json({
      status: "success",
      results: UserFavorite.length,
      data: {
        UserFavorite,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getUserFavorite = async (req, res) => {
  // done
  try {
    const UserFavorite = await UserFavorite.findById(req.params.id).populate(
      "outlet",
    );

    res.status(200).json({
      status: "success",
      data: {
        UserFavorite,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createUserFavorite = async (req, res) => {
  try {
    const newUserFavorite = await UserFavorite.create({
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      data: {
        newUserFavorite,
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

const deleteUserFavorite = async (req, res) => {

  try {
    await UserFavorite.findOneAndDelete({ outlet: req.body.outletId, userId: req.body.userId });
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
  getAllUserFavorite,
  getUserFavorite,
  createUserFavorite,
  deleteUserFavorite,
};
