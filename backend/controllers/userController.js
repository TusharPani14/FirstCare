const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const createUser = asyncHandler(async (req, res) => {
  try {
    const { email_phoneNo, password } = req.body;

    const user = await User.findOne({ email_phoneNo });
    if (user) {
      res.status(501);
      throw new Error("User Already Exists");
    } else {
      const user = await User.create({
        email_phoneNo,
        password,
      });
      if (user) {
        res.status(201).json({
          _id: user._id,
          email: user.email_phoneNo,
          message: "user added successfully",
        });
      } else {
        res.status(501);
        throw new Error("User not added! Try again");
      }
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id, email_phoneNo, password } = req.body;
    if (!email_phoneNo && !password) {
      res.status(400);
      throw new Error("Please Update atleast one field");
    } else {
      const newUser = await User.updateOne(
        { _id: id },
        { email_phoneNo, password }
      );
      if (newUser) {
        res.status(201).json({
          message: "User credentials updated successfully",
        });
      }
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

const authUser = asyncHandler(async (req, res) => {
  try {
    const { email_phoneNo, password } = req.body;

    const user = await User.findOne({ email_phoneNo });
    if (user) {
      if (user.password === password) {
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
      res.status(401);
      throw new Error("Please enter correct credentials");
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({});
    if (user) {
      res.status(201).json({
        message: "Users fetched",
        userList: user,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error("Server error: User fetching unsuccessful");
  }
});

module.exports = { createUser, authUser, getUsers, updateUser };
