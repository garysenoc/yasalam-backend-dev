const Outlet = require("../../models/Outlet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.send("testing route");
};

// CHECK IF LOGIN
const checkIfLogin = (req, res) => {
  try {
    const token = req.cookies.portaltoken;

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

    const existingUser = await Outlet.findOne({ username: username });

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
      .cookie("portaltoken", token, {
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
    .cookie("portaltoken", "", {
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
