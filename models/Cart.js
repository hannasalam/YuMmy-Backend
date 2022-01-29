const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    seats: {
        type: Number,
        default: 1,
      },
    date: {
      type: String,
    }
  }
);

module.exports = mongoose.model("Cart", CartSchema);