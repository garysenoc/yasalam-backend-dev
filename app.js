const express = require("express");
const AppError = require("./utils/appError");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const stripe = require("stripe")(
  "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",
);
const { DateTime, Settings } = require("luxon");

const User = require("./models/User");
const RegisterTransaction = require("./models/RegisterTransaction");

// New Routes
const OutletRoutes = require("./routes/outlet/index");
const AdminRoutes = require("./routes/admin/index");
const LandingRoutes = require("./routes/landing/index");
const MobileRoutes = require("./routes/mobile/index");
const BranchRoutes = require("./routes/branch/index");
// Auth Route
const AdminAuthRoutes = require("./routes/admin/AuthRoute");
const OutletAuthRoute = require("./routes/outlet/AuthRoute");
const BranchAuthRoute = require("./routes/branch/AuthRoute");

// Middleware
const portalAuth = require("./middlewares/portalAuth");
const adminAuth = require("./middlewares/adminAuth");
const branchAuth = require("./middlewares/branchAuth");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
      "https://yasalam-admin.netlify.app",
      "https://yasalam.netlify.app",
      "https://yasalam-outlet-portal.netlify.app",
      "https://yasalam-branch-portal.netlify.app",
      "https://yasalamae.ae",
      "https://www.yasalamae.ae",
    ],
    credentials: true,
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use("/api/v1/category", categoryRouter);
// app.use("/api/v1/feature", featureRouter);
// app.use("/api/v1/admin", adminRouter);
// app.use("/api/v1/outlet", outletRouter);
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/notification", notificationRouter);
// app.use("/api/v1/total", totalRouter);
// app.use("/api/v1/branch", branchRouter);
// app.use("/api/v1/transaction", transactionRouter);
// app.use("/api/v1/visitor", visitorRouter);
// app.use("/api/v1/registertransaction", registerTransactionRouter);

// Auth Routes
app.use("/api/admin/auth", AdminAuthRoutes);
app.use("/api/outlet/auth", OutletAuthRoute);
app.use("/api/branch/auth", BranchAuthRoute);

// New Routes
app.use("/api/outlet", portalAuth, OutletRoutes);
app.use("/api/admin", adminAuth, AdminRoutes);
app.use("/api/branch", branchAuth, BranchRoutes);
app.use("/api/landing", LandingRoutes);
app.use("/api/mobile", MobileRoutes);

Settings.defaultZone = "Asia/Dubai";

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    console.log(req.body.userId);

    const user = await User.findById(req.body.userId);

    let userString = "";

    if (user.userType === "Family") {
      userString = "Family Membership";
    }

    if (user.userType === "Individual") {
      userString = "Individual Membership";
    }

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "AED",
      description: "Yasalam - " + userString,
      payment_method: id,
      confirm: true,
      receipt_email: user.email,
    });

    console.log(user);
    const generateOTP = user.otp;
    console.log("userId");
    console.log(req.body.userId);

    const message = `Hi ${user.name}! Thank you for availing Yasalam Membership.  Enjoy exciting perks and benefits as you explore our services! To proceed with your account, please use this code ${generateOTP} as your OTP for logging in your account. Once again, thank you for patronizing Yasalam and we look forward to your very good feedback soon! Sincerely, Yasalam Team`;
    const htmlMessage = `Hi ${user.name}! <br /> <br />Thank you for availing Yasalam Membership.  Enjoy exciting perks and benefits as you explore our services! <br/> <br />To proceed with your account, please use this code ${generateOTP} as your OTP for logging in your account.<br /> <br/>Once again, thank you for patronizing Yasalam and we look forward to your very good feedback soon!<br/><br/> Sincerely, Yasalam Team`;

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(
      "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",
    );
    const msg = {
      to: user.email,
      from: "ya.salam129@gmail.com",
      subject: "Welcome to Yasalam - One Time Password",
      text: message,
      html: htmlMessage,
    };
    sgMail.send(msg);

    const user_id = req.body.userId;

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
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
  res.status(500).send('Server Error');
})

module.exports = app;
