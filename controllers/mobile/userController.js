const User = require("../../models/User");
const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
const UserFavorite = require("../../models/UserFavorite");

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
    const { otp } = req.body;
    let user = await User.findById(req.body.id);

    const userFavorite = await UserFavorite.find({ userId: req.body.id });

    if (user.userType === "Family") {
      if (user.otp !== otp) {
        if (user.childrenOTP.includes(otp) === false) {
          return res.status(200).json({
            status: "success",
            message: "Please try again",
          });
        }
      }
    } else if (user.otp !== otp) {
      return res.status(200).json({
        status: "success",
        message: "Please try again",
      });
    }
    //Tour.findOne({_id=req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        user,
        userFavorite
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
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: "confirmation@yasalamae.ae",
        pass: "#YaSalam2021",
      },
    });

    const generateOTP = makeid(6);
    const baseUrl = req.body.url;

    const mainID = req.body.mainID;

    const userType = req.body.userType;

    const d = new Date();

    const newDate = new Date(
      d.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
    );

    const day =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    const newMonth = newDate.getMonth() + 1;
    const month = newMonth < 10 ? "0" + newMonth : newMonth;
    const year = newDate.getFullYear();

    const user = await User.findById(mainID);

    if (userType === "Secondary" && user.isSecondaryActive === false) {
      await User.findByIdAndUpdate(mainID, { isSecondaryActive: true });
    } else {
      return res.status(200).json({
        status: "fails",
        data: {
          message: "Already created a spouse",
        },
      });
    }

    const newUser = await User.create({
      ...req.body,
      otp: generateOTP,
      day: day,
      month: month,
      year: year,
      expiryDate: user.expiryDate,
      issueDate: user.issueDate,
    });

    const link = `${baseUrl}?id=${newUser._id}`;
    const message = `Dear ${req.body.name}! Your Yasalam Membership registration is complete. 
    You may now proceed and make your membership payment.
    Upon completing your payment you will receive an email with all the information needed to
    activate your membership.  
    `;
    const htmlMessage = `Dear  ${req.body.name}!
    <br /> <br />
    Your one click away!!!
    Your Yasalam Membership registration is complete.<br>
    Please click on the link below to proceed and make your membership payment.<br><br>

    <a href="${link}"> ${link}</a>
  
    <br><br>

    Feel free to contact our team if you need any help or support. <br/>
    support@yasalamae.ae.

    <br><br>

    Sincerely, 
    <br>
    Yasalam Team`;

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(
      "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",
    );
    // const msg = {
    //   to: req.body.email,
    //   from: "ya.salam129@gmail.com",
    //   subject: "Welcome to Yasalam - Confirmation of Registration",
    //   text: message,
    //   html: htmlMessage,
    // };

    const mailOptions = {
      from: "confirmation@yasalamae.ae",
      to: req.body.email,
      subject: "Welcome to Yasalam - Account Activation",
      text: message,
      html: htmlMessage,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      }
    });

    // sgMail.send(msg);

    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.log("error");
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
    const user1 = await User.findById(req.params.id);

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

    const updateOTP = { otp: generateOTP, isActivate: false };
    const user = await User.findByIdAndUpdate(req.params.id, updateOTP, {
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

const checkLoginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);

    if (user.userType === "Family" && user.isPaid) {
      return res.status(200).json({
        status: "success",
        message: "Success",
        isValid: true,
      });
    }

    if (!user) {
      return res.status(200).json({
        status: "fail",
        message: "The email is not existing",
        isValid: false,
      });
    }

    if (!user.isPaid) {
      return res.status(200).json({
        status: "fail",
        message: "Please pay first for your membership",
        isValid: false,
      });
    }

    if (user.isActivate) {
      return res.status(200).json({
        status: "fail",
        message:
          "You already login to a device, please try again or contact administrator",
        isValid: false,
      });
    }

    const d = new Date();
    const dr = new Date(
      d.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
    );
    const currentDate = new Date(dr);
    const expiryDate = new Date(user.expiryDate);

    if (currentDate >= expiryDate) {
      return res.status(200).json({
        status: "fail",
        message: "Your account has been expired.",
        isValid: false,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Success",
      isValid: true,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const checkOTPVerify = async (req, res) => {
  try {
    const { email, otp, token } = req.body;

    const user = await User.findOne({ email: email });

    let childrenOTP = user.childrenOTP;
    let children_active = user.isChildrenActive;
    let valid = false;
    let count = 0;

    if (user.userType === "Family") {
      if (user.otp === otp) {
        const d = new Date();
        const dr = new Date(
          d.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
        );
        const currentDate = new Date(dr);
        const expiryDate = new Date(user.expiryDate);

        console.log(expiryDate);
        console.log(currentDate >= expiryDate);

        if (currentDate >= expiryDate) {
          return res.status(200).json({
            status: "fail",
            message: "Your account has been expired.",
            isValid: false,
          });
        }

        if (user.isActivate === false) {
          await User.findByIdAndUpdate(user._id, { isActivate: true });

          await User.findByIdAndUpdate(
            user._id,
            { notificationToken: token },
            { new: true },
          );

          return res.status(200).json({
            status: "success",
            user: user._id,
            userData: user,
          });
        } else {
          return res.status(200).json({
            status: "fail",
            message: "Already login. Please contact administrator",
          });
        }
      } else {
        const d = new Date();
        const dr = new Date(
          d.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
        );
        const currentDate = new Date(dr);
        const expiryDate = new Date(user.expiryDate);

        if (currentDate >= expiryDate) {
          return res.status(200).json({
            status: "fail",
            message: "Your account has been expired.",
            isValid: false,
          });
        }

        for (let i in childrenOTP) {
          count = i;
          if (childrenOTP[i] === otp) {
            if (children_active[i] === true) {
              valid = false;
              return res.status(200).json({
                status: "fail",
                message: "Already login. Please contact administrator",
              });
            }
            valid = true;
            break;
          }
        }

        if (valid === true) {
          children_active[count] = true;
          await User.findByIdAndUpdate(user._id, {
            isChildrenActive: children_active,
          });
          return res.status(200).json({
            status: "success",
            user: user._id,
            userData: user,
          });
        }

        if (valid === false && user.isPaid === true) {
          return res.status(200).json({
            status: "fail",
            message: "OTP does not match. Please try again",
          });
        }
      }
    }
    if (user.otp !== otp) {
      res.status(200).json({
        status: "fail",
        message: "OTP does not match. Please try again",
      });
    }

    await User.findByIdAndUpdate(user._id, { isActivate: true });

    await User.findByIdAndUpdate(
      user._id,
      { notificationToken: token },
      { new: true },
    );

    res.status(200).json({
      status: "success",
      user: user._id,
      userData: user,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const addChildrenAccount = async (req, res) => {
  try {
    const generateOTP = makeid(6);

    const main_id = req.body.id;
    const childEmail = req.body.childEmail;

    const main = await User.findById(main_id);

    if (main.children.length >= 3) {
      return res.status(400).json({
        status: "You already have max account of children",
      });
    }

    let children_account = main.children;
    let children_otp = main.childrenOTP;
    let children_active = main.isChildrenActive;

    children_account.push(childEmail);
    children_otp.push(generateOTP);
    children_active.push(false);

    const c = await User.findByIdAndUpdate(
      main_id,
      {
        children: children_account,
        isChildrenActive: children_active,
        childrenOTP: children_otp,
      },
      { new: true },
    );

    const message = `Hi! Thank you for availing Yasalam Membership.  Enjoy exciting perks and benefits as you explore our services! To proceed with your account, please use this code ${generateOTP} as your OTP for logging in your account. Once again, thank you for patronizing Yasalam and we look forward to your very good feedback soon! Sincerely, Yasalam Team`;
    const htmlMessage = `Hi! <br /> <br />Thank you for availing Yasalam Membership.  Enjoy exciting perks and benefits as you explore our services! <br/> <br />To proceed with your account, please use this code ${generateOTP} as your OTP for logging in your account and use your parent's email.<br /> <br/>Once again, thank you for patronizing Yasalam and we look forward to your very good feedback soon!<br/><br/> Sincerely, Yasalam Team`;

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(
      "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",
    );
    const msg = {
      to: childEmail,
      from: "ya.salam129@gmail.com",
      subject: "Welcome to Yasalam (Child Account) - One Time Password",
      text: message,
      html: htmlMessage,
    };
    sgMail.send(msg);

    res.status(201).json({
      status: "success",
      data: {
        c,
      },
    });
  } catch (err) {
    console.log("error");
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getSpouseById = async (req, res) => {
  try {
    const user_id = req.params.id;

    const spouse = await User.findOne({ mainID: user_id }).select("name");

    res.status(201).json({
      status: "success",
      data: {
        spouse,
      },
    });
  } catch (err) {
    console.log("error");
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const checkExpirationUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    const dr = new Date();

    const d = new Date(
      dr.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
    );

    const currentDate = new Date(d);
    const expiryDate = new Date(user.expiryDate);

    if (currentDate >= expiryDate) {
      return res.status(200).json({
        status: "fail",
        message: "Your account has been expired.",
        isValid: false,
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        isValid: true,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
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
  checkLoginUser,
  checkOTPVerify,
  addChildrenAccount,
  getSpouseById,
  checkExpirationUser,
};
