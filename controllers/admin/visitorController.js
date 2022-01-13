const Visitor = require("../../models/Visitor");
const catchAsync = require("../../utils/catchAsync");

const getAllVisitor = async (req, res) => {
  try {
    var populateQuery = [
      { path: "user", select: "name" },
      { path: "branch", select: "name" },
      { path: "outlet", select: "name" },
    ];
    const visit = await Visitor.find().populate(populateQuery);

    res.status(200).json({
      status: "success",
      results: visit.length,
      data: {
        visit,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getVisitor = async (req, res) => {
  // done
  try {
    var populateQuery = [
      { path: "user", select: "name" },
      { path: "branch", select: "name" },
      { path: "outlet", select: "name" },
    ];
    const visit = await Visitor.findById(req.params.id).populate(populateQuery);
    //Tour.findOne({_id=req.params.id})
    return res.status(200).json({
      status: "success",
      data: {
        visit,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createVisitor = async (req, res) => {
  try {
    const date = new Date().toLocaleDateString("en-US", {
      timeZone: "Asia/Dubai",
    });
    const time = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Dubai",
    });

    const newVisitor = await Visitor.create({
      ...req.body,
      date: date,
      time: time,
    });

    res.status(201).json({
      status: "success",
      data: {
        newVisitor,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteVisitor = async (req, res) => {
  try {
    await Visitor.findByIdAndDelete(req.params.id);
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

const updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        visitor,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getUserVisits = async (req, res) => {
  try {
    const user = await Visitor.find({ user: req.params.id }).populate(
      "outlet",
      "name",
    );

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getpecificMonthYearVisitor = catchAsync(async (req, res, next) => {
  var populateQuery = [
    { path: "user", select: "name" },
    { path: "branch", select: "name" },
    { path: "outlet", select: "name" },
  ];
  const { month, year } = req.body;
  const visit = await Visitor.find({ month: month, year: year }).populate(
    populateQuery,
  );

  res.status(200).json({
    status: "success",
    data: {
      visit,
    },
  });
});

const getSpecificDateVisitor = catchAsync(async (req, res, next) => {
  var populateQuery = [
    { path: "user", select: "name" },
    { path: "branch", select: "name" },
    { path: "outlet", select: "name" },
  ];

  const { month, day, year } = req.body;

  const visit = await Visitor.find({
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
  getAllVisitor,
  getVisitor,
  createVisitor,
  deleteVisitor,
  updateVisitor,
  getpecificMonthYearVisitor,
  getSpecificDateVisitor,
};
