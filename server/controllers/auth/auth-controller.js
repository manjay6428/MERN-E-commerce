const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
//register

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ success: false, message: "Email is already registered" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ success: true, message: "Registration Successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

//login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist , please register !",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );
    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .json({ success: true, message: "Logged in successful", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};
//logout

const logoutUser = async (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully!" });
};

//auth-middleware

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorised user" });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Unauthorised user" });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
