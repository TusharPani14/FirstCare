const asyncHandler = require("express-async-handler");
const Bills = require("../models/billModel");

const createBills = asyncHandler(async (req, res) => {
  try {
    const { invoiceNo, name, invoiceDate, phoneNo, products } = req.body;
    if (!invoiceNo || !name || !invoiceDate || !phoneNo || !products[0]) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
    const billRecord = await Bills.find({ invoiceNo }).then((result) => {
      if (result[0]) {
        res.status(501);
        throw new Error(
          "Bill already exists! Select a different Invoice Number"
        );
      }
    });
    const bill = await Bills.create({
      invoiceNo,
      name,
      invoiceDate,
      phoneNo,
      products,
    });
    console.log(bill);
    if (bill) {
      res.status(201).json({
        message: "Bill Created successfully",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error("Server error: Bill creation failed");
  }
});

module.exports = { createBills };
