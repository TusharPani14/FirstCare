const asyncHandler = require("express-async-handler");
const Bills = require("../models/billModel");
const Stocks = require("../models/stocksModel");

const createBills = asyncHandler(async (req, res) => {
  try {
    const { invoiceNo, name, invoiceDate, phoneNo, products, total } = req.body;
    if (
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

    // Check if the bill already exists
    const billRecord = await Bills.findOne({ invoiceNo });
    if (billRecord) {
      res.status(501);
      throw new Error("Bill already exists! Select a different Invoice Number");
    }

    // Create the bill
    const bill = await Bills.create({
      invoiceNo,
      name,
      invoiceDate,
      phoneNo,
      products,
      total,
    });

    // Extract the quantity for each product and reduce it from the stocks table
    for (const product of products) {
      const { pname, quantity } = product;

      // Reduce the quantity from the stocks table
      const stock = await Stocks.findOne({ productName: pname });
      if (!stock) {
        res.status(400);
        throw new Error(`Product '${pname}' is not available in stock`);
      }
      
      if (stock) {
        if (stock.quantity < quantity) {
          res.status(400);
          throw new Error(`Insufficient quantity in stock for product: ${name}`);
        }
        stock.quantity -= Number(quantity);
        await stock.save();
      }
    }

    console.log(bill);
    if (bill) {
      res.status(201).json({
        message: "Bill created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error.message);
  }
});

const getBills = asyncHandler(async (req, res) => {
  try {
    const bill = await Bills.find({});
    if (bill) {
      res.status(201).json({
        message: "Bill fetched successfully",
        billList: bill,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

module.exports = { createBills, getBills };
