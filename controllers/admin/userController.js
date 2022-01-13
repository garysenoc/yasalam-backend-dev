const User = require("../../models/User");
const sgMail = require("@sendgrid/mail");
const catchAsync = require("../../utils/catchAsync");

function makeid(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function sendMessage(toSend, fromSend, subject, text, html) {
  const msg = {
    to: toSend,
    from: fromSend,
    subject: subject,
    text: text,
    html: html,
  };
  return msg;
}

const getAllUser = async (req, res) => {
  // done
  // Done
  try {
    const user = await User.find();

    res.status(200).json({
      status: "success",
      results: user.length,
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

const getUser = async (req, res) => {
  // done
  try {
    const user = await User.findById(req.params.id);
    //Tour.findOne({_id=req.params.id})
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

const createUser = async (req, res) => {
  try {
    const generateOTP = makeid(6);

    const message = `Hi ${req.body.name}! Thank you for availing Yasalam Membership.  Enjoy exciting perks and benefits as you explore our services! To proceed with your account, please use this code ${generateOTP} as your OTP for logging in your account. Once again, thank you for patronizing Yasalam and we look forward to your very good feedback soon! Sincerely, Yasalam Team`;
    const htmlMessage = `Hi ${req.body.name}! <br /> <br />Thank you for availing Yasalam Membership.  Enjoy exciting perks and benefits as you explore our services! <br/> <br />To proceed with your account, please use this code ${generateOTP} as your OTP for logging in your account.<br /> <br/>Once again, thank you for patronizing Yasalam and we look forward to your very good feedback soon!<br/><br/> Sincerely, Yasalam Team`;

    Settings.defaultZone = "Asia/Dubai";

    let aYearFromNow = new Date();

    if (req.body.userType === "Guest") {
      aYearFromNow.setDate(aYearFromNow.getDate() + 7);
    } else {
      aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    }

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(
      "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",
    );
    const msg = {
      to: req.body.email,
      from: "ya.salam129@gmail.com",
      subject: "Welcome to Yasalam - One Time Password",
      text: message,
      html: htmlMessage,
    };
    sgMail.send(msg);

    const newUser = await User.create({
      ...req.body,
      otp: generateOTP,
      expiryDate: aYearFromNow.toLocaleString("en-US", {
        timeZone: "Asia/Dubai",
      }),
    });

    res.status(201).json({
      status: "success",
      data: {
        newUser,
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

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
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

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

const resetOTP = async (req, res) => {
  try {
    const user1 = await User.findById(req.body.id);

    const generateOTP = makeid(6);

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(
      "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",
    );
    const msg = {
      to: user1.email,
      from: "ya.salam129@gmail.com",
      subject: "Yasalam - new One Time Password",
      text: `Your new One Time password is ${generateOTP}`,
      html: `Your new One Time password is <strong>${generateOTP}</strong>`,
    };
    sgMail.send(msg);

    const updateOTP = { otp: generateOTP, isActivate: false };
    const user = await User.findByIdAndUpdate(req.body.id, updateOTP, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "Reset OTP success",
      data: {
        user,
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

const checkUser = async (req, res) => {
  try {
    const email = await User.find({ email: req.body.email });
    const name = await User.find({ name: req.body.name });
    const mobileNumber = await User.find({
      mobileNumber: req.body.mobileNumber,
    });

    let valid = true;

    let messages = [];

    if (email.length !== 0) {
      messages.push("Email is already exist. Please Try again");
      valid = false;
    }
    if (name.length !== 0) {
      messages.push("Name is already exist. Please Try again");
      valid = false;
    }
    if (mobileNumber.length !== 0) {
      messages.push("Mobile number is already exist. Please Try again");
      valid = false;
    }

    res.status(200).json({
      status: "success",
      data: {
        isValid: valid,
        message: messages,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const update = { isActivate: true };

    if (Object.keys(req.body).length === 0 || !user) {
      return res.status(200).json({
        status: "fail",
        data: {
          isValid: false,
          message: "No email entered or no specifc user found",
        },
      });
    }

    if (user.isActivate === true) {
      return res.status(200).json({
        status: "fail",
        data: {
          isValid: false,
          message: "The account is already activated.",
        },
      });
    }

    if (user.otp !== req.body.otp) {
      return res.status(200).json({
        status: "fail",
        data: {
          isValid: false,
          message: "The OTP is incorrect. Please try again.",
        },
      });
    }

    await User.findOneAndUpdate({ email: req.body.email }, update, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        isValid: true,
        user_id: user._id,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const validEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    let valid = false;

    if (user) {
      valid = true;
    }

    res.status(200).json({
      status: "success",
      data: {
        isValid: valid,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getpecificMonthYearUser = catchAsync(async (req, res, next) => {
  const { month, year } = req.body;
  const user = await User.find({ month: month, year: year });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const getSpecificDateUser = catchAsync(async (req, res, next) => {
  const { month, day, year } = req.body;

  const user = await User.find({ day: day, month: month, year: year });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const resendOTP = async (req, res) => {
  try {
    const user1 = await User.findById(req.body.id);

    const generateOTP = makeid(6);

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(
      "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",
    );
    const msg = {
      to: user1.email,
      from: "ya.salam129@gmail.com",
      subject: "Yasalam - One Time Password",
      text: `Your One Time password is ${generateOTP}`,
      html: `Your One Time password is <strong>${generateOTP}</strong>`,
    };
    sgMail.send(msg);

    res.status(200).json({
      status: "Resend OTP success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const addUserPoints = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.body.id });
    const points = user.points;

    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      { points: points + req.body.points },
      { new: true },
    );

    res.status(200).json({
      status: "success",
      data: {
        updatedUser,
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
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  resetOTP,
  checkUser,
  loginUser,
  validEmail,
  getpecificMonthYearUser,
  getSpecificDateUser,
  resendOTP,
  addUserPoints,
};
