
// import mongoose from "mongoose";

// const mongooDB=process.env.DB_URL

// const connection = {}

//  async function  connect() {
    
//     if(connection.isConnect){
//         console.log("your allredy conncted");
//         return
//     }
//     if(mongoose.connections.length>0){      
  
//         if(mongoose.connect.length===1){
//             console.log("Use previous connection");
//             return
//         }
//         await mongoose.disconnect()
//     }

//    const db= await mongoose.connect(mongooDB)
//    console.log("new connection");
   
// }

// async function disconnect(params) {
//     if(connection.isConnect){
//         if(process.env.NODE_ENV==="production"){
//             await mongoose.disconnect()
//             connection.isConnect=true            
//         }else{
//             console.log("DB not connect");
            
//         }
//     }
// }

// const db={connect,disconnect}

// export default db;

import mongoose from "mongoose";

const mongooDB = process.env.DB_URL;

const connection = {};

// MongoDB connection handler
async function connect() {
  if (connection.isConnect) {
    console.log("Already connected to the database");
    return;
  }

  if (mongoose.connections.length > 0) {
    if (mongoose.connections[0].readyState === 1) {
      console.log("Using previous connection");
      connection.isConnect = true;
      return;
    }
    await mongoose.disconnect();
  }

  try {
    await mongoose.connect(mongooDB);
    console.log("New MongoDB connection established");
    connection.isConnect = true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Database connection failed");
  }
}

// Disconnect logic
async function disconnect() {
  if (connection.isConnect) {
    try {
      await mongoose.disconnect();
      console.log("MongoDB disconnected");
      connection.isConnect = false;
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
    }
  }
}
const db={connect,disconnect}

export default db;