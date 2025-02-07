// import bcryp
import db from "@/utlis/db";
import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";
const secrekey = "sxadsadsadas";
export default async function handler(req, res) {
  let sucess = false;
  const salt = await bcrypt.genSalt(10);
  let securePass = await bcrypt.hash(req.body.password, salt);

  if (req.method === "POST") {
    await db.connect();
    try {

      const { name, email,  address,admin } = req.body;

       User.create({
        name: name,
        email: email,
        password: securePass,
        address: address,
        admin:admin
      }).then((user) => {        
        const data = {
          user: { data: user["_id"] },
        };
        const authToken = jwt.sign(data, secrekey);
        sucess = true;
        res.json({ sucess, authToken });
      }).catch(error=>res.json({error:error.message}))

      
    } catch (error) {
      console.log(error, "error");
    }

    await db.disconnect();
  }
}


