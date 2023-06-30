const asyncHandler = require("express-async-handler");
const Bills = require("../models/billModel");
const Stocks = require("../models/stocksModel");
const User = require("../models/userModel");

const createBills = asyncHandler(async (req, res) => {
  try {
    const { userId, invoiceNo, name, invoiceDate, phoneNo, products, total } =
      req.body;
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

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Check if the bill already exists
    const billRecord = await Bills.findOne({ invoiceNo });
    if (billRecord) {
      res.status(501);
      throw new Error("Bill already exists! Select a different Invoice Number");
    }

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
        if (stock.totalQuantity < quantity) {
          res.status(400);
          throw new Error(
            `Insufficient quantity in stock for product: ${name}`
          );
        }
        stock.totalQuantity -= Number(quantity);
        const remainingQuantity =
          Number(stock.pack) * stock.quantity - stock.totalQuantity;
        const newPack =
          Number(stock.pack) - Math.floor(remainingQuantity / stock.quantity);
        stock.pack = newPack;
        await stock.save();
      }
    }

    // Create the bill
    const bill = await Bills.create({
      invoiceNo,
      name,
      invoiceDate,
      phoneNo,
      products,
      total,
      user: userId,
    });

    user.bills.push(bill._id);
    user.fullBill.push(bill);
    console.log(user);
    await user.save();

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
