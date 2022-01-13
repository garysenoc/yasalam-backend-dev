const UserOutlet = require("./../../models/UserOutlet");
const Outlet = require("./../../models/Outlet");
const bcrypt = require("bcryptjs");

// const test = (req, res) => {
// 	res.send('admin testing route')
// }
// const createOutlet =  async (req, res) => {
//     try {
//         const { email, password, passwordVerify } = req.body
//         //validation
//         if(!email || !password || !passwordVerify)
//             return res.status(400).json({ errorMessage: "Please enter all required fields" });

//         if(password.length < 6)
//             return res.status(400).json({ errorMessage: "Please Enter at least 6 characters" });

//         if(password !== passwordVerify)
//             return res.status(400).json({ errorMessage: "Please Enter the same password twice" });

//         const existingUser = await UserOutlet.findOne({ email: email })

//         if(existingUser)
//             return res.status(409).json({ errorMessage: "User Already Exist" });

//         // hash password
//         const salt =  await bcrypt.genSalt()
//         const passwordHash = await bcrypt.hash(password, salt)

//         // save new user

//         const newUser = new UserOutlet({
//             email,
//             password: passwordHash
//         })

//         const saveUser = await newUser.save()

//         res.json(saveUser)

//     } catch (error) {
//         console.error(error)
//         res.status(500).send();
//     }
// }

const createOutlet = async (req, res) => {
  try {
    const { password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newOutlet = await Outlet.create({
      ...req.body,
      password: passwordHash,
    });

    res.status(201).json({
      status: "success",
      data: {
        newOutlet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getOutlet = async (req, res) => {
  try {
    const outlet = await Outlet.findById(req.params.id).populate("category");
    res.status(200).json({
      status: "success",
      data: {
        outlet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getAllOutlet = async (req, res) => {
  try {
    const outlet = await Outlet.find().populate("category").select("-password");

    res.status(200).json({
      status: "success",
      results: outlet.length,
      data: {
        outlet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteOutlet = async (req, res) => {
  try {
    await Outlet.findByIdAndDelete(req.params.id);
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

const updateOutlet = async (req, res) => {
  try {
    const outlet = await Outlet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        outlet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getAllOutletNameOnly = async (req, res) => {
  try {
    const outlet = await Outlet.find().select("name");

    res.status(200).json({
      status: "success",
      results: outlet.length,
      data: {
        outlet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const updateOutletPassword = async (req, res) => {
  try {
    const outlet = await Outlet.findById(req.params.id);

    const { password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newOutlet = await Outlet.findByIdAndUpdate(
      outlet._id,
      { password: passwordHash },
      { new: true },
    );

    res.status(200).json({
      status: "success",
      data: {
        newOutlet,
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
  createOutlet,
  getOutlet,
  getAllOutlet,
  deleteOutlet,
  updateOutlet,
  getAllOutletNameOnly,
  updateOutletPassword,
};
