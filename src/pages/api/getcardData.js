import db from "@/utlis/db";
import Order from "@/models/OrderCard";


export default async function handler(req, res) {
  const { email } = req.body;
  if (req.method === "POST") {
    await db.connect();
    try {
      const data =await Order.findOne({ email });      
      res.json({ data, sucess: true });
    } catch (error) {
        
      res.send("Server Error", error.message);
    }

   await db.disconnect();
  }
}
