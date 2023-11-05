const mongoose = require("mongoose");

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
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  deliveryDate: {
    type: Date,
  },
  address: {
    type: String, // Add your address field here
    // required: true, // You can change this validation as needed
  },
  phoneNumber: {
    type: String, // Add your phone number field here
    // required: true, // You can change this validation as needed
  },
});

// Calculate the delivery date as three days from the current date
orderSchema.pre("save", function (next) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 3);
  this.deliveryDate = currentDate;
  next();
});

module.exports = mongoose.model("Order", orderSchema);
