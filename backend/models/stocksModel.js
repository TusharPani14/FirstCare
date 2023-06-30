const mongoose = require("mongoose");

const stocksSchema = mongoose.Schema(
  {
    productName: { type: String, required: true },
    pack: { type: String, required: true },
    rate: { type: Number, required: true },
    purchaseRate: { type: Number, required: true ,default:0},
    date: { type: String, required: true },
    saltName: { type: String, required: true },
    hsnCode: { type: Number, required: true },
    expDate: { type: String, required: true },
    location: { type: String, required: true },
    mfg: { type: String, required: true },
    batch: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    free: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Stocks = mongoose.model("Stocks", stocksSchema);

module.exports = Stocks;
