const asyncHandler = require("express-async-handler");
const Bills = require("../models/billModel");

const createBills = asyncHandler(async (req, res) => {
    try {
      const {
        invoiceNo,
        name,
        invoiceDate,
        phoneNo,
        products,
      } = req.body;
      if (
        !invoiceNo ||
        !name ||
        !invoiceDate ||
        !phoneNo ||
        !products[0]
      ) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
      } else {
        const bill = await Bills.create({
            invoiceNo,
            name,
            invoiceDate,
            phoneNo,
            products,
        });
        if (bill) {
          res.status(201).json({
            message: "Bill Created successfully",
          });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(400);
      throw new Error("Server error: Bill creation failed");
    }
  });

  module.exports={createBills}