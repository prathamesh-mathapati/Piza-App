import mongoose from "mongoose";

const OrderCard=new mongoose.Schema({
    order_data:{type:Array,require:true},
    email: { type: String, require:true}
}, {
    timestamps: true,
  })

const Order=mongoose.models.Order|| mongoose.model("Order",OrderCard);

export default Order;