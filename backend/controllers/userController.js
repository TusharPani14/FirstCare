const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const createUserModel = require("../models/userModel");
const generateToken = require("../config/generateToken");
const dotenv = require("dotenv");
dotenv.config();

const connections = [
  { name: "Connection1", uri: process.env.MONGO_URI },
  { name: "Connection2", uri: process.env.MONGO_URI2 },
];

// Create connections
const connectionPromises = connections.map((connection) => {
  if (!connection.uri) {
    throw new Error(`Missing MongoDB URI for connection: ${connection.name}`);
  }
  return mongoose.createConnection(connection.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

let User1; // Declare variables outside the promise scope
let User2;

// Wait for all connections to be established
Promise.all(connectionPromises)
  .then((connectionInstances) => {
    // Create user models for each connection
    const userModels = connectionInstances.map((connection, index) => ({
      name: connections[index].name,
      model: createUserModel(connection),
    }));

    // Example usage
    User1 = userModels.find((model) => model.name === "Connection1").model;
    User2 = userModels.find((model) => model.name === "Connection2").model;

    // Rest of the code...
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    // Handle the error
  });

const createUser = asyncHandler(async (req, res) => {
  try {
    const { email_phoneNo, password, location } = req.body;
    console.log(email_phoneNo, password, location);
    let newUser1 = null;
    let newUser2 = null;

    if (location === "Adakata") {
      const user1 = await User1.findOne({ email_phoneNo });
      if (user1) {
        res.status(501);
        throw new Error("User Already Exists in Adakata");
      }
      newUser1 = await User1.create({ email_phoneNo, password, location });
    } else if (location === "Sorada") {
      const user2 = await User2.findOne({ email_phoneNo });
      if (user2) {
        res.status(501);
        throw new Error("User Already Exists in Sorada");
      }
      newUser2 = await User2.create({ email_phoneNo, password, location });
    } else if (location === "All") {
      const user1 = await User1.findOne({ email_phoneNo });
      const user2 = await User2.findOne({ email_phoneNo });

      if (user1 && user2) {
        res.status(501);
        throw new Error("User Already Exists in Adakata and Sorada");
      } else if (user1) {
        newUser2 = await User2.create({ email_phoneNo, password, location });
      } else if (user2) {
        newUser1 = await User1.create({ email_phoneNo, password, location });
      } else {
        newUser1 = await User1.create({ email_phoneNo, password, location });
        newUser2 = await User2.create({ email_phoneNo, password, location });
      }
    } else {
      res.status(400);
      throw new Error("Invalid location");
    }

    if (newUser1 && newUser2) {
      res.status(201).json({
        message: "Users added successfully",
        userList: [newUser1, newUser2],
      });
    } else if (newUser1) {
      res.status(201).json({
        message: "User added successfully to Adakata",
        user: newUser1,
      });
    } else if (newUser2) {
      res.status(201).json({
        message: "User added successfully to Sorada",
        user: newUser2,
      });
    } else {
      res.status(501);
      throw new Error("User not added! Try again");
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id, email_phoneNo, password, location } = req.body;
    if (!email_phoneNo && !password && !location) {
      res.status(400);
      throw new Error("Please update at least one field");
    } else {
      let updatedUser1 = null;
      let updatedUser2 = null;

      if (location === "Adakata") {
        const user1 = await User1.findOne({ _id: id });
        const user2 = await User2.findOne({ email_phoneNo });

        if (user1 && user2) {
          // If user exists in both User1 and User2, remove user from User2
          updatedUser2 = await User2.deleteOne({ email_phoneNo });
        }

        updatedUser1 = await User1.updateOne(
          { _id: id },
          { email_phoneNo, password, location }
        );
      } else if (location === "Sorada") {
        const user1 = await User1.findOne({ email_phoneNo });
        const user2 = await User2.findOne({ _id: id });
        if (user1 && user2) {
          // If user exists in both User1 and User2, remove user from User1
          updatedUser1 = await User1.deleteOne({ email_phoneNo });
        }

        updatedUser2 = await User2.updateOne(
          { _id: id },
          { email_phoneNo, password, location }
        );
      } else if (location === "All") {
        const user1 = await User1.findOne({ _id: id });
        const user2 = await User2.findOne({ _id: id });

        if (user1 && user2) {
          updatedUser1 = await User1.updateOne(
            { _id: id },
            { email_phoneNo, password, location }
          );
          updatedUser2 = await User2.updateOne(
            { _id: id },
            { email_phoneNo, password, location }
          );
        } else if (user1) {
          // If user exists only in User1, update in User2
          updatedUser1 = await User1.updateOne(
            { _id: id },
            { email_phoneNo, password, location }
          );
        } else if (user2) {
          // If user exists only in User2, update in User1
          updatedUser2 = await User2.updateOne(
            { _id: id },
            { email_phoneNo, password, location }
          );
        }
      } else {
        res.status(400);
        throw new Error("Invalid location");
      }

      if (updatedUser1 && updatedUser2) {
        res.status(201).json({
          message: "User credentials updated in both Adakata and Sorada",
        });
      } else if (updatedUser1) {
        res.status(201).json({
          message: "User credentials updated in Adakata",
        });
      } else if (updatedUser2) {
        res.status(201).json({
          message: "User credentials updated in Sorada",
        });
      } else {
        res.status(404);
        throw new Error("User not found");
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

    const user = await Promise.all([
      User1.findOne({ email_phoneNo }),
      User2.findOne({ email_phoneNo }),
    ]);

    const foundUser = user.find((u) => u !== null);

    if (foundUser) {
      if (foundUser.password === password) {
        res.json({
          _id: foundUser._id,
          email_phoneNo: foundUser.email_phoneNo,
          location: foundUser.location,
          token: generateToken(foundUser._id),
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
    const users1 = await User1.find({});
    const users2 = await User2.find({});

    const users = [...users1, ...users2];

    if (users) {
      res.status(201).json({
        message: "Users fetched",
        userList: users,
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
    const user1 = await User1.findOne({ _id });
    const user2 = await User2.findOne({ _id });

    let deletedUser;
    if (user1 && user2) {
      // If user exists in both User1 and User2, delete from both
      deletedUser = await Promise.all([
        User1.deleteOne({ _id }),
        User2.deleteOne({ _id }),
      ]);
    } else if (user1) {
      deletedUser = await User1.deleteOne({ _id });
    } else if (user2) {
      deletedUser = await User2.deleteOne({ _id });
    } else {
      res.status(404);
      throw new Error("User not found");
    }

    if (deletedUser) {
      res.status(201).json({
        message: "User removed successfully",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

module.exports = { createUser, authUser, getUsers, updateUser, deleteUser };
