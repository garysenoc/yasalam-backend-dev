const RegisterTransaction = require("../../models/RegisterTransaction");
const catchAsync = require("../../utils/catchAsync");

const getAllRegisterTransaction = async (req, res) => {
  try {
    const registerTransaction = await RegisterTransaction.find();

    res.status(200).json({
      status: "success",
      data: {
        registerTransaction,
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

const getRegisterTransaction = async (req, res) => {
  // done
  try {
    const registerTransaction = await RegisterTransaction.findById(
      req.params.id,
    );
    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        registerTransaction,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const createRegisterTransaction = async (req, res) => {
  try {
    const newRegisterTransaction = await RegisterTransaction.create({
      ...req.body,
      amountPaid: req.body.amountPaid / 100,
    });

    res.status(201).json({
      status: "success",
      data: {
        newRegisterTransaction,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteRegisterTransaction = async (req, res) => {
  try {
    await RegisterTransaction.findByIdAndDelete(req.params.id);
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

const updateRegisterTransaction = async (req, res) => {
  try {
    const registerTransaction = await RegisterTransaction.findByIdAndUpdate(
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
        registerTransaction,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getpecificMonthYearRegisterTransaction = catchAsync(
  async (req, res, next) => {
    const { month, year } = req.body;
    const registerTransaction = await RegisterTransaction.find({
      month: month,
      year: year,
    });

    res.status(200).json({
      status: "success",
      data: {
        registerTransaction,
      },
    });
  },
);

const getSpecificDateRegisterTransaction = catchAsync(
  async (req, res, next) => {
    const { month, day, year } = req.body;

    const registerTransaction = await RegisterTransaction.find({
      day: day,
      month: month,
      year: year,
    });

    res.status(200).json({
      status: "success",
      data: {
        registerTransaction,
      },
    });
  },
);

module.exports = {
  getAllRegisterTransaction,
  getRegisterTransaction,
  createRegisterTransaction,
  deleteRegisterTransaction,
  updateRegisterTransaction,
  getpecificMonthYearRegisterTransaction,
  getSpecificDateRegisterTransaction,
};
