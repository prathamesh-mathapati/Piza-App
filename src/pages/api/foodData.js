import db from "@/utlis/db";
import PizzData from "../models/Pizzadata";

export default async function  handler (req, res) {

    if(req.method==="POST"){
        await db.connect();
        
        for(let i=0;i< req.body.length; i++){
            let pizza=new PizzData({
                name:req.body[i].name,
                category:req.body[i].category,
                  foodType: req.body[i].foodType,
                  price: req.body[i].price,
                  description: req.body[i].description,
                  img: req.body[i].img
            })
            await pizza.save();
        }
        res.status(200).json({ message: "all data is send" });
    }
    
    if(req.method==="GET"){
        await db.connect();
       const pizaalisatData=await PizzData.find()
       res.status(200).json({message:"All data receive",data:pizaalisatData})

    }

}
