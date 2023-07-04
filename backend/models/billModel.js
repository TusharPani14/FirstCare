const mongoose = require("mongoose");

const createBillsModel = (connection) => {
  const billSchema = mongoose.Schema(
    {
      invoiceNo: { type: String, required: true },
      name: { type: String, required: true },
      invoiceDate: { type: String, required: true },
      phoneNo: { type: Number, required: true },
      products: [{}],
      total: { type: Number, required: true, default: 0 },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
      timestamps: true,
    }
  );

  return connection.model("Bills", billSchema);
};

module.exports = createBillsModel;
