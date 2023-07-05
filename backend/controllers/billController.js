const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const createBillsModel = require("../models/billModel");
const createStocksModel = require("../models/stocksModel");
const createUserModel = require("../models/userModel");
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

let Bill1;
let Bill2;

let User1;
let User2;

let Stock1;
let Stock2;

// Wait for all connections to be established
Promise.all(connectionPromises)
  .then((connectionInstances) => {
    // Create bill models for each connection
    const billModels = connectionInstances.map((connection, index) => ({
      name: connections[index].name,
      model: createBillsModel(connection),
    }));

    const userModels = connectionInstances.map((connection, index) => ({
      name: connections[index].name,
      model: createUserModel(connection),
    }));

    const stockModels = connectionInstances.map((connection, index) => ({
      name: connections[index].name,
      model: createStocksModel(connection),
    }));

    // Example usage
    Bill1 = billModels.find((model) => model.name === "Connection1").model;
    Bill2 = billModels.find((model) => model.name === "Connection2").model;

    // Example usage
    User1 = userModels.find((model) => model.name === "Connection1").model;
    User2 = userModels.find((model) => model.name === "Connection2").model;

    // Example usage
    Stock1 = stockModels.find((model) => model.name === "Connection1").model;
    Stock2 = stockModels.find((model) => model.name === "Connection2").model;
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    // Handle the error
  });

const createBills = asyncHandler(async (req, res) => {
  try {
    const {
      userId,
      invoiceNo,
      name,
      invoiceDate,
      phoneNo,
      products,
      total,
      location,
    } = req.body;
    if (
      !userId ||
      !invoiceNo ||
      !name ||
      !invoiceDate ||
      !phoneNo ||
      !products[0] ||
      !total
    ) {
      res.status(400);
      throw new Error("Please enter all the fields");
    }
    let billModel;
    let user;
    // Check if the user exists in User1
    if (location === "Adakata") {
      billModel = Bill1;
      user = await User1.findOne({ _id: userId });
    } else if (location === "Sorada") {
      billModel = Bill2;
      user = await User2.findOne({ _id: userId });
    } else {
      res.status(404);
      throw new Error("Invalid Location");
    }

    // Check if the bill already exists
    const billRecord = await billModel.findOne({ invoiceNo });
    if (billRecord) {
      res.status(501);
      throw new Error("Bill already exists! Select a different Invoice Number");
    }

    // Extract the quantity for each product and reduce it from the stocks table
    for (const product of products) {
      const { pname, quantity } = product;

      let stockModel = Stock1;
      if (location === "Sorada") {
        stockModel = Stock2;
      }

      // Reduce the quantity from the stocks table
      const stock = await stockModel.findOne({ productName: pname });
      if (!stock) {
        res.status(400);
        throw new Error(`Product '${pname}' is not available in stock`);
      }

      if (stock.totalQuantity < quantity) {
        res.status(400);
        throw new Error(`Insufficient quantity in stock for product: ${pname}`);
      }

      stock.totalQuantity -= quantity;
      const remainingQuantity =
        stock.pack * stock.quantity - stock.totalQuantity;
      const newPack = Math.floor(remainingQuantity / stock.quantity);
      stock.pack = newPack;
      await stock.save();
    }

    // Create the bill
    const bill = await billModel.create({
      invoiceNo,
      name,
      invoiceDate,
      phoneNo,
      products,
      total,
      user: userId,
      location
    });

    user.bills.push(bill._id);
    user.fullBill.push(bill);
    await user.save();

    res.status(201).json({
      message: "Bill created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error.message);
  }
});

const getBills = asyncHandler(async (req, res) => {
  try {
    const bills1 = await Bill1.find({});
    const bills2 = await Bill2.find({});

    const billList = [...bills1, ...bills2];

    if (billList.length > 0) {
      res.status(201).json({
        message: "Bills fetched successfully",
        billList: billList,
      });
    } else {
      res.status(404);
      throw new Error("No bills found");
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

module.exports = { createBills, getBills };
