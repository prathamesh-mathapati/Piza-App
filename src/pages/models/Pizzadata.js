import mongoose from "mongoose";

const dataSchema=new mongoose.Schema({
    name:{type:String,require},
    category:{type:String,require},
      foodType: {type:String,require},
      price:{type:Object,require},
      description: {type:String,require},
      img: {type:String,require}
},{
    timestamps:true
  })

const PizzData=mongoose.models.PizzData||mongoose.model("PizzData",dataSchema)

export default PizzData;