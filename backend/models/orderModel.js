const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  carts: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
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
