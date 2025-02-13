import db from "@/utlis/db";
import PizzData from "../models/Pizzadata";

export default async function  handler (req, res) {
    if(req.method==="POST"){        
        await db.connect();
       const pizaalisatData=await PizzData.findById(req.body.id)
       res.status(200).json({message:"All data receive",data:pizaalisatData})
        db.disconnect()
    }

}
