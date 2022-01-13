const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const catchAsync = require("../../utils/catchAsync");

const getAllTransaction = async (req, res) => {
  try {
    var populateQuery = [
      { path: "user", select: "name" },
      { path: "branch", select: "name" },
      { path: "outlet", select: "name" },
    ];
    const transaction = await Transaction.find().populate(populateQuery);
    return res.status(200).json({
      status: "success",
      results: transaction.length,
      data: {
        transaction,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getTransaction = async (req, res) => {
  try {
    var populateQuery = [
      { path: "user", select: "name" },
      { path: "branch", select: "name" },
      { path: "outlet", select: "name" },
    ];
    const transaction = await Transaction.findById(req.params.id).populate(
      populateQuery,
    );

    return res.status(200).json({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const date = new Date().toLocaleDateString("en-US", {
      timeZone: "Asia/Dubai",
    });
    const time = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Dubai",
    });

    const newTransaction = await Transaction.create({
      ...req.body,
      date: date,
      time: time,
    });

    const user_data = await User.findById({ _id: req.body.user });

    const savings = user_data.savings + req.body.savings;
    const updateSavings = { savings: savings };

    const user = await User.findByIdAndUpdate(req.body.user, updateSavings, {
      new: true,
      runValidators: true,
    });

    return res.status(201).json({
      status: "success",
      data: {
        newTransaction,
        user,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    return res.status(204).json({
      status: "success",
      message: `Successfully deleted`,
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.find({
      user: req.params.id,
    }).populate("outlet", "name");

    res.status(200).json({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getpecificMonthYearTransaction = catchAsync(async (req, res, next) => {
  const { month, year } = req.body;
  var populateQuery = [
    { path: "user", select: "name" },
    { path: "branch", select: "name" },
    { path: "outlet", select: "name" },
  ];
  const transaction = await Transaction.find({
    month: month,
    year: year,
  }).populate(populateQuery);
  res.status(200).json({
    status: "success",
    data: {
      transaction,
    },
  });
});

const getSpecificDateTransaction = catchAsync(async (req, res, next) => {
  const { month, day, year } = req.body;

  var populateQuery = [
    { path: "user", select: "name" },
    { path: "branch", select: "name" },
    { path: "outlet", select: "name" },
  ];
  const transaction = await Transaction.find({
    day: day,
    month: month,
    year: year,
  }).populate(populateQuery);

  res.status(200).json({
    status: "success",
    data: {
      transaction,
    },
  });
});

module.exports = {
  getAllTransaction,
  getTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getUserTransactions,
  getpecificMonthYearTransaction,
  getSpecificDateTransaction,
};
