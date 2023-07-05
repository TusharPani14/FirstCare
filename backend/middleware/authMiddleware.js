const jwt = require("jsonwebtoken");
const createUserModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
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

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user1 = await User1.findById(decoded.id).select("-password");
      const user2 = await User2.findById(decoded.id).select("-password");
      if (user1) req.user = user1;
      else if (user2) req.user = user2;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized,token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});

module.exports = { protect };
