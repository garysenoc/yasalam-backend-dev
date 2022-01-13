const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const Outlet = require("../../models/Outlet");
const User = require("../../models/User");
const Booking = require("../../models/Transaction");
const Category = require("../../models/Category");
const Feature = require("../../models/Feature");
const Visitor = require("../../models/Visitor");
const Transaction = require("../../models/Transaction");
const RegisterTransaction = require("../../models/RegisterTransaction");
const Branch = require("../../models/Branch");

//get top 10 recent transactions
const getRecentTransactions = catchAsync(async (req, res, next) => {
  var populateQuery = [
    { path: "user", select: "name" },
    { path: "outlet", select: "name" },
  ];

  const outlet = req.user;
  const transaction = await Transaction.find({ outlet: outlet })
    .populate(populateQuery)
    .sort({ _id: -1 })
    .limit(10);

  res.status(200).json({
    status: "success",
    data: {
      transaction,
    },
  });
});

//get top 10 recent visitors
const getRecentVisitors = catchAsync(async (req, res, next) => {
  const outlet = req.user;
  const visitor = await Visitor.find({ outlet: outlet })
    .select("user date time")
    .populate("user")
    .sort({ _id: -1 })
    .limit(10);

  res.status(200).json({
    status: "success",
    data: {
      visitor,
    },
  });
});

//get stats of outlet for dasdhboard
const getStatsOutlet = catchAsync(async (req, res, next) => {
  const outlet = req.user;

  const visitor = await Visitor.count({ outlet: outlet });
  const transaction = await Transaction.count({ outlet: outlet });

  const allTransaction = await Transaction.find({ outlet: outlet });

  let total_sales = 0;

  for (let i in allTransaction) {
    total_sales += allTransaction[i].totalPrice;
  }

  res.status(200).json({
    status: "success",
    data: {
      num_of_visitor: visitor,
      num_of_transaction: transaction,
      total_sales: total_sales,
    },
  });
});

//get transactions of outlet
const getOutletTransactions = catchAsync(async (req, res, next) => {
  var populateQuery = [
    { path: "user", select: "name" },
    { path: "outlet", select: "name" },
  ];

  const outlet = req.user;
  const transaction = await Transaction.find({ outlet: outlet }).populate(
    populateQuery,
  );

  res.status(200).json({
    status: "success",
    data: {
      transaction,
    },
  });
});

//get visitors of outlet
const getOutletVisitors = catchAsync(async (req, res, next) => {
  var populateQuery = [
    { path: "user", select: "name" },
    { path: "outlet", select: "name" },
  ];

  const outlet = req.user;
  const visitor = await Visitor.find({ outlet: outlet })
    .select("user outlet totalPrice date time")
    .populate(populateQuery);

  res.status(200).json({
    status: "success",
    data: {
      visitor,
    },
  });
});

//get visitors of outlet using post
const getOutletVisitorsUsingPost = catchAsync(async (req, res, next) => {
  var populateQuery = [
    { path: "user", select: "name" },
    { path: "outlet", select: "name" },
  ];

  const outlet = req.user;
  const visit = await Visitor.find({ outlet: outlet })
    .select("user outlet totalPrice date time")
    .populate(populateQuery);

  res.status(200).json({
    status: "success",
    data: {
      visit,
    },
  });
});

//get visitor QR
const getVisitorQR = catchAsync(async (req, res, next) => {
  const user_id = req.body.user;
  const user = await User.findOne({ _id: user_id }).select("name");

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

//check user
const checkUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("name");

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

//post visitor QR
const postVisitorQR = catchAsync(async (req, res, next) => {
  console.log(req.user);

  const user_id = req.body.user;

  const d = new Date();

  const newDate = new Date(
    d.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
  );

  const day =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  let status = "in";

  const check = await Visitor.find({
    user: req.body.user,
    outlet: req.user,
    day: day,
    month: month,
    year: year,
  }).sort({ _id: -1 });

  if (check.length > 0 && check[0].status === "in") {
    status = "out";
  }

  const user = await Visitor.create({
    user: req.body.user,
    outlet: req.user,
    day: day,
    month: month,
    year: year,
    status: status,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

//post transaction QR

const postTransactionQR = catchAsync(async (req, res, next) => {
  const user_id = req.body.user;

  const price = req.body.totalPrice;

  const user1 = await User.findById(user_id);

  let totalPoints = user1.points + Math.floor(price / 10);
  let totalSavings = user1.savings + req.body.saveMoney;
  console.log(user1.savings);
  console.log(req.body.totalSavings);

  await User.findByIdAndUpdate(user_id, {
    savings: totalSavings,
    points: totalPoints,
  });

  //add points to the user depends on the transaction
  const d = new Date();

  const newDate = new Date(
    d.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
  );

  const day =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const user = await Transaction.create({
    ...req.body,
    outlet: req.user,
    day: day,
    month: month,
    year: year,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const getpecificMonthYearTransaction = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { month, year } = req.body;
  var populateQuery = [
    { path: "user", select: "name" },
    { path: "outlet", select: "name" },
  ];
  const transaction = await Transaction.find({
    outlet: req.user,
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
    { path: "outlet", select: "name" },
  ];

  const transaction = await Transaction.find({
    outlet: req.user,
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

const getpecificMonthYearVisitor = catchAsync(async (req, res, next) => {
  const { month, year } = req.body;
  var populateQuery = [
    { path: "user", select: "name" },
    { path: "outlet", select: "name" },
  ];
  const visit = await Visitor.find({
    outlet: req.user,
    month: month,
    year: year,
  }).populate(populateQuery);

  res.status(200).json({
    status: "success",
    data: {
      visit,
    },
  });
});

const getSpecificDateVisitor = catchAsync(async (req, res, next) => {
  console.log("visitor");

  var populateQuery = [
    { path: "user", select: "name" },
    { path: "outlet", select: "name" },
  ];

  const { month, day, year } = req.body;

  const visit = await Visitor.find({
    outlet: req.user,
    day: day,
    month: month,
    year: year,
  }).populate(populateQuery);

  res.status(200).json({
    status: "success",
    data: {
      visit,
    },
  });
});

module.exports = {
  getRecentTransactions,
  getRecentVisitors,
  getStatsOutlet,
  getOutletTransactions,
  getOutletVisitors,
  getOutletVisitorsUsingPost,
  getVisitorQR,
  checkUser,
  postVisitorQR,
  postTransactionQR,
  getpecificMonthYearTransaction,
  getSpecificDateTransaction,
  getpecificMonthYearVisitor,
  getSpecificDateVisitor,
};
