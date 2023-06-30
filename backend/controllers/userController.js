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

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const token = generateToken();
  if (user) {
    const data = await User.updateOne({ email }, { $set: { token: token } });
    sendResetPassword(user.name, user.email, token);
    res
      .status(200)
      .send({ success: true, message: "Please check your email!" });
  } else {
    res.status(401);
    throw new Error("This email does not exist");
  }
});

const sendResetPassword = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILUSER,
      to: email,
      subject: "For Reset Password",
      html: `<p> Hi ${name}, Please copy the link and <a href="http://localhost:5000/user/reset-password?token=${token}
      "> reset your password </a></p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent:- ", info.response);
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

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

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    const stock = await User.deleteOne({ _id });
    if (stock) {
      res.status(201).json({
        message: "User Removed successfully",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

module.exports = { createUser, authUser, getUsers, updateUser, deleteUser ,sendResetPassword};
