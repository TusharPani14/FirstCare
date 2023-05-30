const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    invoiceNo: { type: String, required: true },
    name: { type: String, required: true },
    invoiceDate: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    products: [{
        productName: { type: String, required: true },
        rate: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        discountPercent: { type: Number, required: true },
      }],
  },
  {
    timestamps: true,
  }
);

const Bills = mongoose.model("Bills", billSchema);

module.exports = Bills;
