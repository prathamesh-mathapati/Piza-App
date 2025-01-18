import mongoose from "mongoose";


const dataSchema =new mongoose.Schema({
    name:{type:String,require},
    email:{type:String, require},
    password:{type:String,require},
    address:{type:String, require}

})
const User=mongoose.model.User || mongoose.model("User",dataSchema)
export default User;