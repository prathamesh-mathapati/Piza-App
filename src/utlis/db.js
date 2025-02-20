import mongoose from "mongoose";

const mongooDB = process.env.DB_URL;
const connection = {
  isConnect: false,
};

async function connect() {
  if (connection.isConnect) {
    console.log("You're already connected to the database.");
    return;
  }

  try {
    if (mongoose.connections.length > 0) {
      if (mongoose.connection.readyState === 1) {
        console.log("Using the previous database connection.");
        connection.isConnect = true;
        return;
      }

      console.log("Disconnecting from the previous connection...");
      await mongoose.disconnect();
    }

    console.log("Establishing a new database connection...");
    await mongoose.connect(mongooDB, { useNewUrlParser: true, useUnifiedTopology: true });
    connection.isConnect = true;
    console.log("New database connection established.");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    // Log the complete error object for debugging
    console.error(error);
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
    console.error("Error disconnecting from the database:", error.message);
    // Log the complete error object for debugging
    console.error(error);
  }
}

const db = { connect, disconnect };

export default db;
