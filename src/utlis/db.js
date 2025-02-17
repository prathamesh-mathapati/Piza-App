
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

const connection = {
  isConnect: false, // Ensure this is initialized properly
};

async function connect() {
  if (connection.isConnect) {
    console.log("You're already connected to the database.");
    return;
  }

  try {
    if (mongoose.connections.length > 0) {
      // Check if the existing connection is valid
      if (mongoose.connection.readyState === 1) {
        console.log("Using the previous connection.");
        connection.isConnect = true;
        return;
      }

      // If there are other connections, disconnect
      await mongoose.disconnect();
    }

    // Make a new connection
    await mongoose.connect(mongooDB);
    connection.isConnect = true;
    console.log("New database connection established.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

async function disconnect() {
  if (!connection.isConnect) {
    console.log("No active database connection to disconnect.");
    return;
  }

  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnect = false;
      console.log("Database disconnected successfully.");
    } else {
      console.log("In non-production mode, not disconnecting.");
    }
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
}

const db = { connect, disconnect };

export default db;
