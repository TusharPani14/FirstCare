const asyncHandler = require("express-async-handler");
const Stocks = require("../models/stocksModel");

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
      !quantity||
      !totalQuantity
    ) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    } else {
      const stock = await Stocks.create({
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
    const stock = await Stocks.find({});
    if (stock) {
      res.status(201).json({
        message: "Stock fetched successfully",
        stockList: stock,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

const getStockCP = asyncHandler(async (req, res) => {
  const {productName}=req.body
  try {
    const stock = await Stocks.findOne({productName});
    if (stock) {
      res.status(201).json({
        message: "StockCP fetched successfully",
        stockCP: stock.purchaseRate,
      });
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
      throw new Error("Please Update atleast one field");
    } else {
      const stock = await Stocks.updateOne(
        { _id },
        {
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
        }
      );
      if (stock) {
        res.status(201).json({
          message: "Product updated successfully",
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

const deleteStocks = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    const stock = await Stocks.deleteOne({ _id });
    if (stock) {
      res.status(201).json({
        message: "Stock deleted successfully",
        stockList: stock,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

module.exports = { createStocks, getStocks, updateStocks, deleteStocks ,getStockCP};
