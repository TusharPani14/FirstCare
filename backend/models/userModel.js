const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email_phoneNo: { type: String, required: true },
    password: { type: String, required: true },
    bills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bills" }],
    fullBill: [{ type: Object }],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("billsData", {
  ref: "Bills",
  localField: "bills",
  foreignField: "_id",
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
