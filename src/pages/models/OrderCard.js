import mongoose from "mongoose";

const OrderCard = new mongoose.Schema(
  {
    order_data: { type: Array, required: true },
    email: { type: String, required: true }, // Define the index in `schema.index()` instead if necessary.
  },
  {
    timestamps: true,
  }
);

// Only use schema.index() if you need custom indexing elsewhere
OrderCard.index({ email: 1 });  // Declare the index explicitly here

const Order = mongoose.models.Order || mongoose.model("Order", OrderCard);

export default Order;

