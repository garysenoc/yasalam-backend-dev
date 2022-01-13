const RegisterTransaction = require("../../models/RegisterTransaction");

const test = async (req, res) => {
  res.send("register transaction test route");
};

const createRegisterTransaction = async (req, res) => {
  try {
    const d = new Date();

    const newDate = new Date(
      d.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
    );

    const day =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    const newMonth = newDate.getMonth() + 1;
    const month = newMonth < 10 ? "0" + newMonth : newMonth;
    const year = newDate.getFullYear();

    const newRegisterTransaction = await RegisterTransaction.create({
      ...req.body,
      amountPaid: req.body.amountPaid / 100,
      day: day,
      month: month,
      year: year,
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

module.exports = {
  test,
  createRegisterTransaction,
};
