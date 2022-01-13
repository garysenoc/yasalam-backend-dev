const Referral = require('../../models/Referral')
const User = require('../../models/User')

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
  charactersLength));
   }
   return result;
  }
  

const test = (req, res) => {
	res.send('admin auth testing route')
}

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


const getAllReferral = async (req, res) => {
    try {
      const referrals = await Referral.find()
  
      res.status(200).json({
        status: "success",
        data:{
          referrals
        }
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }

const generateReferral = async (req, res) => {
    try {
      const count = req.body.count

      const codes = []

      for(let i = 0; i<count;i++) {

        codes.push(await Referral.create({code:makeid(10)}))
      }
  
      res.status(200).json({
        status: "success",
        data:{
          codes
        }
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }

  const deleteReferral = async (req, res) => {
    try {
      const referralCode = req.body.code

      await Referral.findOneAndDelete({code:referralCode})
  
      res.status(200).json({
        status: "success"
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }


  const confirmReferral = async (req, res) => {
    try {
      const referralCode = req.body.code
      const email = req.body.email

      const user = await User.find({email: email})
      const referral = await Referral.find({code: referralCode})

      if(user.length === 0){
        return res.status(204).json({
            status: "User not exist"
          });
      }

      if(referral.length === 0){
        return res.status(204).json({
            status: "Referral not exist"
          });
      }

      await User.findByIdAndUpdate(user._id,{isPaid:true})
      await Referral.findOneAndDelete({code:referralCode})
  
      res.status(200).json({
        status: "success"
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }
  
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
    getAllReferral
}