const Referral = require("../../models/Referral");
const User = require("../../models/User");
const nodemailer = require("nodemailer");

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const test = (req, res) => {
  res.send("admin auth testing route");
};

// CREATE ADMIN ACCOUNT
// const createAdmin =  async (req, res) => {
//     try {
//         const { username, password } = req.body
//         //validation
//         if(!username || !password)
//             return res.status(400).json({ errorMessage: "Please enter all required fields" });

//         const existingUser = await UserAdmin.findOne({ username: username })

//         if(existingUser)
//             return res.status(409).json({ errorMessage: "User Already Exist" });

//         // hash password
//         const salt =  await bcrypt.genSalt()
//         const passwordHash = await bcrypt.hash(password, salt)

//         // save new user

//         const newUser = new UserAdmin({
//             username,
//             password: passwordHash,
//             type: 'Admin'
//         })

//         const saveUser = await newUser.save()

//         res.json(saveUser)

//     } catch (error) {
//         console.error(error)
//         res.status(500).send();
//     }
// }

// GET ALL ADMIN

const getAllReferral = async (req, res) => {
  try {
    const referrals = await Referral.find();

    res.status(200).json({
      status: "success",
      data: {
        referrals,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const generateReferral = async (req, res) => {
  try {
    const count = req.body.count;

    for (let i = 0; i < count; i++) {
      await Referral.create({ code: makeid(10) });
    }

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteReferral = async (req, res) => {
  try {
    const referralCode = req.body.code;

    await Referral.findOneAndDelete({ code: referralCode });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const confirmReferral = async (req, res) => {
  try {
    const referralCode = req.body.code;
    const email = req.body.email;

    const user = await User.find({
      email: email,
      isPaid: false,
    });
    const referral = await Referral.find({ code: referralCode });

    if (user.length === 0) {
      return res.status(200).json({
        status: "User not exist or User Account is already activated",
      });
    }

    if (referral.length === 0) {
      return res.status(200).json({
        status: "Referral not exist",
      });
    }

    await User.findByIdAndUpdate(user[0]._id, { isPaid: true }, { new: true });
    await Referral.findOneAndDelete({ code: referralCode });

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: "confirmation@yasalamae.ae",
        pass: "#YaSalam2021",
      },
    });

    const message = `Hi ${user[0].name}! <br />
    Welcome to YaSalam  <br /> <br />
    
    UAE’s leading lifestyle membership platform. <br/> <br/> 
    
    Your YaSalam account OTP is ${user[0].otp}<br/>
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
    const htmlMessage = `Hi ${user[0].name}! <br />
    Welcome to YaSalam  <br /> <br />
    
    UAE’s leading lifestyle membership platform. <br/> <br/> 
    
    Your YaSalam account OTP is ${user[0].otp}<br/>
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
      to: user[0].email,
      subject: `Welcome to Yasalam ${user[0].userType} Membership - One Time Password`,
      text: message,
      html: htmlMessage,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//   // GET SINGLE ADMIN
//   const getAdmin = async (req, res) => {
//     try {
//       const admin = await UserAdmin.findById(req.params.id).select('-password');

//       res.status(200).json({
//         status: "success",
//         data: {
//           admin,
//         },
//       });
//     } catch (err) {
//       res.status(404).json({
//         status: "fail",
//         message: err,
//       });
//     }
//   };

//   // DELETE ADMIN
//   const deleteAdmin = async (req, res) => {
//     try {
//       await UserAdmin.findByIdAndDelete(req.params.id);
//       res.status(204).json({
//         status: "success",
//         message: `Successfully deleted`,
//       });
//     } catch (err) {
//       res.status(404).json({
//         status: "fail",
//         message: err,
//       });
//     }
//   };

//   //UPDATE ADMIN
//   const updateAdmin = async (req, res) => {
//     try {
//       const { username, password } = req.body

//       let passwordHash = undefined
//       if(password) {
//           const salt =  await bcrypt.genSalt()
//           passwordHash = await bcrypt.hash(password, salt)
//       }

//       const admin = await UserAdmin.findByIdAndUpdate(req.params.id, {
//         username,
//         password: passwordHash
//       }, {
//         new: true,
//         runValidators: true,
//       }).select('-password');

//       res.status(200).json({
//         status: "success",
//         data: {
//           admin,
//         },
//       });
//     } catch (err) {
//         console.log(err)
//       res.status(404).json({
//         status: "fail",
//         message: err,
//       });
//     }
//   };

//   // CHANGE ADMIN PASSWORD
//   const changeAdminPassword = async (req, res) => {
//     try {

//       const userAdmin = await UserAdmin.findById(req.user)

//       const { password } = req.body

//       const salt =  await bcrypt.genSalt()
//       const passwordHash = await bcrypt.hash(password, salt)

//       const newUserAdmin = await UserAdmin.findByIdAndUpdate(userAdmin._id, {password:passwordHash},{new:true})

//       res.status(204).json({
//         status: "success",
//         data:{
//           newUserAdmin
//         }
//       });
//     } catch (err) {
//       console.log(err)
//       res.status(404).json({
//         status: "fail",
//         message: err,
//       });
//     }
//   };

module.exports = {
  test,
  generateReferral,
  deleteReferral,
  confirmReferral,
};
