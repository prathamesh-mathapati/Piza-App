import mongoose from "mongoose";

const OrderCard = new mongoose.Schema(
  {
    order_data: { type: Array, required: true },
    email: { type: String, required: true }, 
  },
  {
    timestamps: true,
  }
);

OrderCard.index({ email: 1 }); 

const Order = mongoose.models.Order || mongoose.model("Order", OrderCard);

export default Order;

