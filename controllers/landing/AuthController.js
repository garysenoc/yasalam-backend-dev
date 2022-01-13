const User = require("../../models/User");
const RegisterTransaction = require("../../models/User");
const { DateTime, Settings } = require("luxon");
const stripe = require("stripe")(
  "sk_test_51JMRMDB7lG4J9OJlJRnvxrowfAxMBXecZ6f0c3UT9SXALmS7Ey87NWmrZHp3th202WvF5ZFjifaaHHmr9ATNMZus00lgiP4PxL",
);

const nodemailer = require("nodemailer");

const test = (req, res) => {
  res.send("landing auth testing route");
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

const makeid = (length) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getUserName = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name");

    res.status(200).json({
      status: "fail",
      message: err,
      data: {
        name: user,
      },
    });
  } catch (err) {
    console.log("Error", error);
    res.status(404).json({
      message: "Payment failed",
      success: false,
    });
  }
};

const updatePaidUser = async (req, res) => {
  let { amount, id, userId } = req.body;

  try {
    const user = await User.findById(req.body.userId);

    let userType = user.userType;

    const generateOTP = user.otp;

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: "confirmation@yasalamae.ae",
        pass: "#YaSalam2021",
      },
    });

    const message = `Hi ${user.name}! <br />
    Welcome to YaSalam  <br /> <br />
    
    UAE’s leading lifestyle membership platform. <br/> <br/> 
    
    Your YaSalam account OTP is ${generateOTP}<br/>
    Please don’t share your one time password (OTP) with anyone.<br/> <br/>

    Get started and be “YaSalam” in 3 easy steps <br/><br/>
    1-	Download YaSalam App
    2-	Login by using your email and your OTP
    3-	Start Exploring and enjoy.  

    <br/><br/>
    Please feel free to contact our support team if you need any help <br/>
     support@yasalamae.ae .

     <br/><br/><br/>
     Stay healthy and YaSalam

     <br/><br/>
    Sincerely,  <br/>
    YaSalam Team`;
    const htmlMessage = `Hi ${user.name}! <br />
    Welcome to YaSalam  <br /> <br />
    
    UAE’s leading lifestyle membership platform. <br/> <br/> 
    
    Your YaSalam account OTP is ${generateOTP}<br/>
    Please don’t share your one time password (OTP) with anyone.<br/> <br/>

    Get started and be “YaSalam” in 3 easy steps <br/><br/>
    1-	Download YaSalam App
    2-	Login by using your email and your OTP
    3-	Start Exploring and enjoy.  

    <br/><br/>
    Please feel free to contact our support team if you need any help <br/>
     support@yasalamae.ae .

     <br/><br/><br/>
     Stay healthy and YaSalam

     <br/><br/>
    Sincerely,  <br/>
    YaSalam Team`;

    const mailOptions = {
      from: "confirmation@yasalamae.ae",
      to: user.email,
      subject: `Welcome to Yasalam ${userType} Membership - One Time Password`,
      text: message,
      html: htmlMessage,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      }
    });

    const user_id = req.body.userId;

    let toPay = 0.0;

    if (user.userType === "Family") {
      toPay = 4900 * 100;
    } else {
      toPay = 3500 * 100;
    }

    const payment = await stripe.paymentIntents.create({
      toPay,
      currency: "AED",
      description: "Yasalam",
      payment_method: id,
      confirm: true,
    });

    let aYearFromNow = new Date();
    let issueDate = new Date();

    if (user.userType === "Guest") {
      aYearFromNow.setDate(aYearFromNow.getDate() + 7);
    } else {
      aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    }

    const update_user = await User.findByIdAndUpdate(
      user_id,
      {
        isPaid: true,
      },
      { new: true },
    );
    console.log(update_user);

    const d = new Date();

    const newDate = new Date(
      d.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
    );

    const day =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    const newMonth = newDate.getMonth() + 1;
    const month = newMonth < 10 ? "0" + newMonth : newMonth;
    const year = newDate.getFullYear();

    await RegisterTransaction.create({
      name: user.name,
      accountType: user.userType,
      amountPaid: amount / 100,
      day: day,
      month: month,
      year: year,
    });

    const currentDate = new Date();

    const currentDateDubai = new Date(
      currentDate.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
    );

    const expiryDate = new Date(
      aYearFromNow.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
    );

    await User.findByIdAndUpdate(
      user._id,
      {
        expiryDate: expiryDate,
        issueDate: currentDateDubai,
      },
      { new: true },
    );

    console.log("customer paid");
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
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

    const d = new Date();

    const newDate = new Date(
      d.toLocaleDateString("en-US", { timeZone: "Asia/Dubai" }),
    );

    const day =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    const newMonth = newDate.getMonth() + 1;
    const month = newMonth < 10 ? "0" + newMonth : newMonth;
    const year = newDate.getFullYear();

    const newUser = await User.create({
      ...req.body,
      otp: generateOTP,
      day: day,
      month: month,
      year: year,
    });

    const link = `${baseUrl}/${newUser._id}`;

    const message = `Hi ${req.body.name}! Thank you for availing Yasalam Membership.  You may continue to the payment of your membership in this link: ${link}`;
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

    const mailOptions = {
      from: "confirmation@yasalamae.ae",
      to: req.body.email,
      subject: `Welcome to Yasalam ${newUser.userType} Membership - Account Activation`,
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

const getUserType = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("userType");

    res.status(200).json({
      status: "fail",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log("Error", err);
    res.status(404).json({
      message: "Payment failed",
      success: false,
    });
  }
};

const checkIfPaid = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("isPaid");

    res.status(200).json({
      status: "fail",
      data: {
        isPaid: user.isPaid,
      },
    });
  } catch (err) {
    console.log("Error", err);
    res.status(404).json({
      message: "Payment failed",
      success: false,
    });
  }
};

const resendEmail = async (req, res) => {
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
    const user1 = await User.findById(req.body.id);

    const baseUrl = req.body.url;

    const link = `${baseUrl}/${user1.id}`;

    const message = `Hi ${user1.name}! Thank you for availing Yasalam Membership.  You may continue to the payment of your membership in this link: ${link}`;
    const htmlMessage = `Dear  ${user1.name}!
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

    const mailOptions = {
      from: "confirmation@yasalamae.ae",
      to: user1.email,
      subject: `Welcome to Yasalam ${user1.userType} Membership - Account Activation`,
      text: message,
      html: htmlMessage,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({
      status: "Resend Email success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = {
  test,
  checkUser,
  createUser,
  updatePaidUser,
  getUserName,
  resendOTP,
  getUserType,
  checkIfPaid,
  resendEmail,
};
