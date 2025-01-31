import db from "@/utlis/db";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secrekey = "sxadsadsadas";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const{email,password}=req.body;
    await db.connect();

    try {
        const userDb=User.findOne({email})
        if(!userDb){
            return res.status(400).json({error:"Enter valid email id"})
        }
        const EncryptEamilId= await bcrypt.compare(password,userDb.password)
        if(!EncryptEamilId){
            return res.status(400).json({error:"Enter valid email password"})
        }
        const data={
            user:{
                id:userDb["_id"]
            }
        }
        const auth=jwt.sign(data,secrekey)
         res.status(200).json({sucess:true,auth})
    } catch (error) {
         res.send("Sever Error")
    }
    await db.disconnect();
   
  }
}
