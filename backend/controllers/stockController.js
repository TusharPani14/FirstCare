const asyncHandler = require("express-async-handler");
const createStockModel = require("../models/stocksModel");
const createUserModel = require("../models/userModel");
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

let Stock1; // Declare variables outside the promise scope
let Stock2;

let User1; // Declare variables outside the promise scope
let User2;

// Wait for all connections to be established
Promise.all(connectionPromises)
  .then((connectionInstances) => {
    // Create user models for each connection
    const stockModels = connectionInstances.map((connection, index) => ({
      name: connections[index].name,
      model: createStockModel(connection),
    }));

    const userModels = connectionInstances.map((connection, index) => ({
      name: connections[index].name,
      model: createUserModel(connection),
    }));

    // Example usage
    User1 = userModels.find((model) => model.name === "Connection1").model;
    User2 = userModels.find((model) => model.name === "Connection2").model;

    // Example usage
    Stock1 = stockModels.find((model) => model.name === "Connection1").model;
    Stock2 = stockModels.find((model) => model.name === "Connection2").model;

    // Rest of the code...
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    // Handle the error
  });

const createStocks = asyncHandler(async (req, res) => {
  try {
    const {
      productName,
      pack,
      rate,
      purchaseRate,
      date,
      saltName,
      hsnCode,
      expDate,
      location,
      mfg,
      batch,
      quantity,
      totalQuantity,
      free,
    } = req.body;

    if (
      !productName ||
      !pack ||
      !rate ||
      !purchaseRate ||
      !date ||
      !saltName ||
      !hsnCode ||
      !expDate ||
      !location ||
      !mfg ||
      !batch ||
      !quantity ||
      !totalQuantity
    ) {
      res.status(400);
      throw new Error("Please enter all the fields");
    } else {
      let stock;
      if (location === "Adakata") {
        stock = await Stock1.create({
          productName,
          pack,
          rate,
          purchaseRate,
          date,
          saltName,
          hsnCode,
          expDate,
          location,
          mfg,
          batch,
          quantity,
          totalQuantity,
          free,
        });
      } else if (location === "Sorada") {
        stock = await Stock2.create({
          productName,
          pack,
          rate,
          purchaseRate,
          date,
          saltName,
          hsnCode,
          expDate,
          location,
          mfg,
          batch,
          quantity,
          totalQuantity,
          free,
        });
      } else {
        res.status(400);
        throw new Error("Invalid location");
      }

      if (stock) {
        res.status(201).json({
          message: "Product added successfully",
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

const getStocks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Search for user in User1 collection
    const user1 = await User1.findById(userId);
    if (user1) {
      // User found in User1 collection, fetch stocks from Stock1
      const stock1 = await Stock1.find({});
      res.status(200).json({
        message: "Stocks fetched successfully",
        stockList: stock1,
      });
      return; // Return early after sending the response
    }

    // Search for user in User2 collection
    const user2 = await User2.findById(userId);
    if (user2) {
      // User found in User2 collection, fetch stocks from Stock2
      const stock2 = await Stock2.find({});
      res.status(200).json({
        message: "Stocks fetched successfully",
        stockList: stock2,
      });
      return; // Return early after sending the response
    }

    // User not found in either User1 or User2 collection
    res.status(404);
    throw new Error("No stocks found");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const getStocksForAdmin = asyncHandler(async (req, res) => {
  try {
    const stock1 = await Stock1.find({});
    const stock2 = await Stock2.find({});

    const allStocks = [...stock1, ...stock2];

    if (allStocks.length > 0) {
      res.status(201).json({
        message: "Stock fetched successfully",
        stockList: allStocks,
      });
    } else {
      res.status(200).json({
        message: "No stocks found",
        stockList: [],
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

const getStockCP = asyncHandler(async (req, res) => {
  const { productName } = req.body;
  try {
    let stock;
    let stockCP;

    // Search for the product in Stock1
    stock = await Stock1.findOne({ productName });
    if (stock) {
      stockCP = stock.purchaseRate;
    }

    // If not found in Stock1, search in Stock2
    if (!stock) {
      stock = await Stock2.findOne({ productName });
      if (stock) {
        stockCP = stock.purchaseRate;
      }
    }

    if (stock) {
      res.status(201).json({
        message: "StockCP fetched successfully",
        stockCP,
      });
    } else {
      res.status(404);
      throw new Error("Product not found in stock");
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

const updateStocks = asyncHandler(async (req, res) => {
  try {
    const {
      _id,
      productName,
      pack,
      rate,
      purchaseRate,
      date,
      saltName,
      hsnCode,
      expDate,
      location,
      mfg,
      batch,
      quantity,
      totalQuantity,
      free,
    } = req.body;

    // Check if at least one field is being updated
    if (
      !pack &&
      !rate &&
      !purchaseRate &&
      !date &&
      !saltName &&
      !hsnCode &&
      !expDate &&
      !location &&
      !mfg &&
      !batch &&
      !quantity &&
      !totalQuantity &&
      !free
    ) {
      res.status(400);
      throw new Error("Please update at least one field");
    }

    let stock;

    // Check if the stock is present in Stock1
    stock = await Stock1.findOne({ _id });

    if (stock) {
      // Adjust location if necessary
      if (location === "Adakata") {
        // Location is already in Stock1, update the stock in Stock1
        await Stock1.updateOne({ _id }, req.body);
      } else {
        // Location has been changed, throw an error
        res.status(400);
        throw new Error("This stock is of Adakata. Please verify the location you have entered.");
      }
    } else {
      // The stock is not present in Stock1, check if it's present in Stock2
      stock = await Stock2.findOne({ _id });

      if (stock) {
        // Adjust location if necessary
        if (location === "Sorada") {
          // Location is already in Stock2, update the stock in Stock2
          await Stock2.updateOne({ _id }, req.body);
        } else {
          // Location has been changed, throw an error
          res.status(400);
          throw new Error("This stock is of Sorada. Please verify the location you have entered.");
        }
      } else {
        // Stock not found in either Stock1 or Stock2
        res.status(404);
        throw new Error("Stock not found");
      }
    }

    res.status(201).json({
      message: "Product updated successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

const deleteStocks = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    let stock;

    // Search and delete in Stock1
    stock = await Stock1.findOne({ _id });
    if (stock) {
      await Stock1.deleteOne({ _id });
      res.status(201).json({
        message: "Stock deleted successfully",
        stockList: stock,
      });
      return;
    }

    // Search and delete in Stock2
    stock = await Stock2.findOne({ _id });
    if (stock) {
      await Stock2.deleteOne({ _id });
      res.status(201).json({
        message: "Stock deleted successfully",
        stockList: stock,
      });
      return;
    }

    // Stock not found in both Stock1 and Stock2
    res.status(404);
    throw new Error("Stock not found");
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

module.exports = {
  createStocks,
  getStocks,
  updateStocks,
  deleteStocks,
  getStockCP,
  getStocksForAdmin,
};
