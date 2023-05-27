const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const authUser = asyncHandler(async (req, res) => {
  try {
    const { email_phoneNo, password } = req.body;

    const user = await User.findOne({ email_phoneNo });
    if (user) {
      if (await user.matchPassword(password)) {
        res.json({
          _id: user._id,
          email_phoneNo: user.email_phoneNo,
          token: generateToken(user._id),
        });
      } else {
        res.status(501);
        throw new Error("Please enter correct password");
      }
    } else {
      const user = await User.create({
        email_phoneNo,
        password,
      });
      if (user) {
        res.status(201).json({
          _id: user._id,
          email: user.email,
          token: generateToken(user._id),
        });
      }
    }
  } catch (e) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { authUser };
