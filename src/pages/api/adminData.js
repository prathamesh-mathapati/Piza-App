import db from "@/utlis/db";
import PizzData from "../models/Pizzadata";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();

    let pizza = new PizzData({
      name: req.body.name,
      category: req.body.category,
      foodType: req.body.foodType,
      price: req.body.price,
      description: req.body.description,
      img: req.body.img,
    });
    await pizza.save();
    res.status(200).json({ message: "all data is send" });
    db.disconnect();
  }
}
