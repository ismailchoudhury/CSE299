const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  carts: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
  orderDate: { type: Date, default: Date.now },
  // totalAmount: {
  //   type: Number,
  //   required: true,
  // },
  // deliveryDate: {
  //   type: Date,
  // },
});

module.exports = mongoose.model("Order", orderSchema);
