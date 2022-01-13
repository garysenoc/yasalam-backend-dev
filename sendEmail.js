const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   port: 465,
//   secure: true, // use SSL
//   auth: {
//     user: "confirmation@yasalamae.ae",
//     pass: "#YaSalam2021",
//   },
// });

// const message = `Hi ! Thank you for availing Yasalam Membership.  You may continue to the payment of your membership in this link: link`;
// const htmlMessage = `Dear  !
//  <br /> <br />
//  Your one click away!!!
//  Your Yasalam Membership registration is complete.<br>
//  Please click on the link below to proceed and make your membership payment.<br><br>

//  <a href="link"> link</a>

//  <br><br>

//  Feel free to contact our team if you need any help or support. <br/>
//  support@yasalamae.ae.

//  <br><br>

//  Sincerely,
//  <br>
//  Yasalam Team`;

// const mailOptions = {
//   from: "confirmation@yasalamae.ae",
//   to: "gsenoc@gmail.com",
//   subject: `Welcome to Yasalam  Membership - Account Activation`,
//   text: message,
//   html: htmlMessage,
// };

// transporter.sendMail(mailOptions, function (err, info) {
//   if (err) {
//     console.log(err);
//   }
// });

// const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   port: 465,
//   secure: true, // use SSL
//   auth: {
//     user: "confirmation@yasalamae.ae",
//     pass: "#YaSalam2021",
//   },
// });

// const baseUrl = "https://www.yasalamae.ae/payment";

// const newUserId = "61d5655e45c772d1aa36edce";
// const name = "Naser Mohamed Alharthi";
// const email = "naser.akeen@hotmail.com";
// const userType = "Family";

// const link = `${baseUrl}/${newUserId}`;

// const message = `Hi ${name}! Thank you for availing Yasalam Membership.  You may continue to the payment of your membership in this link: ${link}`;
// const htmlMessage = `Dear ${name}!
//        <br /> <br />
//        Your one click away!!!
//        Your Yasalam Membership registration is complete.<br>
//        Please click on the link below to proceed and make your membership payment.<br><br>

//        <a href="${link}"> ${link}</a>

//        <br><br>

//        Feel free to contact our team if you need any help or support. <br/>
//        support@yasalamae.ae.

//        <br><br>

//        Sincerely,
//        <br>
//        Yasalam Team`;

// const mailOptions = {
//   from: "confirmation@yasalamae.ae",
//   to: email,
//   subject: `Welcome to Yasalam ${userType} Membership - Account Activation`,
//   text: message,
//   html: htmlMessage,
// };

// transporter.sendMail(mailOptions, function (err, info) {
//   if (err) {
//     console.log(err);
//   }
// });

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: "confirmation@yasalamae.ae",
    pass: "#YaSalam2021",
  },
});

const baseUrl = "https://www.yasalamae.ae/payment";

const newUserId = "61d85f93e635932cb2b81363";
const name = "Saleh Yahya Alharthi";
const email = "saleh.yahya1@hotmail.com";
const userType = "Family";

const link = `${baseUrl}/${newUserId}`;

const message = `Hi ${name}! Thank you for availing Yasalam Membership.  You may continue to the payment of your membership in this link: ${link}`;
const htmlMessage = `Dear ${name}!
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
  to: email,
  subject: `Welcome to Yasalam ${userType} Membership - Account Activation`,
  text: message,
  html: htmlMessage,
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log(err);
  }
});
