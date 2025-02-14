import db from "@/utlis/db";
import Order from "@/models/OrderCard";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Ensure that database connection is established
    await db.connect();

    // Validate incoming request data
    const { email, order_data, date } = req.body;
    if (!email || !order_data || !Array.isArray(order_data) || order_data.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid request data" });
    }

    // Add order date to the order data
    order_data.unshift({ order_date: date });

    try {
      // Check if the user already has an order
      const existingOrder = await Order.findOne({ email });

      if (!existingOrder) {
        // If no existing order, create a new order entry
        await Order.create({
          email,
          order_data: [order_data],
        });

        return res.status(201).json({ success: true });
      } else {
        // If order exists, push the new order data
        await Order.findOneAndUpdate(
          { email },
          { $push: { order_data } },
          { new: true }
        );

        return res.status(200).json({ success: true });
      }
    } catch (error) {
      console.error(error.message); // Log the error message for debugging
      return res.status(500).json({ success: false, message: "Server error: " + error.message });
    } finally {
      // Always disconnect the database after the operation
      await db.disconnect();
    }
  } else {
    // Handle unsupported HTTP methods (only POST is allowed here)
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
