
import mongoose from "mongoose";

const mongooDB=process.env.DB_URL

const connection = {}

 async function  connect() {
    if(connection.isConnect){
        console.log("your allredy conncted");
        return
    }
    if(mongoose.connections.length>0){        
        if(mongoose.connect.length===1){
            console.log("Use previous connection");
            return
        }
        await mongoose.disconnect()
    }
   const db= await mongoose.connect(mongooDB)
   console.log("new connection");
   
}

async function disconnect(params) {
    if(connection.isConnect){
        if(process.env.NODE_ENV==="production"){
            await mongoose.disconnect()
            connection.isConnect=true            
        }else{
            console.log("DB not connect");
            
        }
    }
}

const db={connect,disconnect}

export default db;