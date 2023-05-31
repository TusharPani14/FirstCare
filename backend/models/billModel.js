const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    invoiceNo: { type: String, required: true },
    name: { type: String, required: true },
    invoiceDate: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    products: [{}],
    total: { type: Number, required: true ,default:0},
  },
  {
    timestamps: true,
  }
);

const Bills = mongoose.model("Bills", billSchema);

module.exports = Bills;
