const ProductHistory = require("../../models/ProductHistory");
const Outlet = require("../../models/Outlet");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const getAllProductHistory = async (req, res) => {
  try {
    const productHistory = await ProductHistory.find().populate([
      "productId",
      "userId",
    ]);

    res.status(200).json({
      status: "success",
      results: productHistory.length,
      data: {
        productHistory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getProductHistory = async (req, res) => {
  // done
  try {
    const productHistory = await ProductHistory.findById(
      req.params.id,
    ).populate(["productId", "userId"]);
    res.status(200).json({
      status: "success",
      data: {
        productHistory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createProductHistory = async (req, res) => {
  try {
    const newProductHistory = await ProductHistory.create({
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      data: {
        newProductHistory,
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

const deleteProductHistory = async (req, res) => {
  try {
    await ProductHistory.findByIdAndDelete(req.params.id);
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

const updateProductHistory = async (req, res) => {
  try {
    const productHistory = await ProductHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: "success",
      data: {
        productHistory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getProductHistoryByUser = async (req, res) => {
  // done
  try {
    const userId = req.body.userId;

    const user = await User.findById(userId);
    const productHistory = await ProductHistory.find({
      userId: userId,
    }).populate("productId");

    res.status(200).json({
      status: "success",
      data: {
        productHistory,
      },
    });
  } catch (err) { 
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const updateProductHistoryClaim = async (req, res) => {
  try {
    const productHistory = await ProductHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: "success",
      data: {
        productHistory,
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
  getAllProductHistory,
  getProductHistory,
  createProductHistory,
  deleteProductHistory,
  updateProductHistory,
  getProductHistoryByUser,
  updateProductHistoryClaim,
};
