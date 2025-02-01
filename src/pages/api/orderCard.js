import db from "@/utlis/db";
import Order from "../models/OrderCard";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();
    let data = req.body.order_data;
    await data.splice(0, 0, { order_date: req.body.date });
    let eId =await Order.findOne({ email: req.body.email });
    console.log(eId,"eId",eId === null,data);
    
    if (eId === null) {
      try {
        await Order.create({ email: req.body.email, order_data: [data] }).then(
          () => {
            res.json({ sucess: true });
          }
        );
      } catch (error) {
        res.send("Server Error", error.message);
      }
    } else {
      try {
        await Order.findOneAndUpdate(
          { email: req.body.email },
          { $push: { order_data: data } }
        ).then(() => {
          res.json({ sucess: true });
        });
      } catch (error) {
        res.send("Server Error", error.message);
      }
    }

    await db.disconnect();
  }
}
