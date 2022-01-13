const UserAdmin = require("../../models/UserAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.send("admin auth testing route");
};

// CHECK IF LOGIN
const checkIfLogin = (req, res) => {
  try {
    const token = req.cookies.admintoken;

    if (!token) return res.status(200).json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // validate
    if (!username || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });

    const existingUser = await UserAdmin.findOne({ username: username });

    if (!existingUser)
      return res.status(401).json({ errorMessage: "Invalid Credentials" });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Invalid Credentials" });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET,
    );

    // send the HTTP-only cookie

    res
      .cookie("admintoken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const logout = (req, res) => {
  res
    .cookie("admintoken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    })
    .send();
};

module.exports = {
  test,
  checkIfLogin,
  login,
  logout,
};
