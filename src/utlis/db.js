import mongoose from "mongoose";

const mongooDB = process.env.DB_URL; // Your MongoDB URI
const connection = {
  isConnect: false, // Tracks connection status in a serverless context
};

// Function to handle MongoDB connection
async function connect() {
  if (connection.isConnect) {
    console.log("You're already connected to the database.");
    return;
  }

  try {
    if (mongoose.connections.length > 0) {
      // Check if there's already an existing connection
      if (mongoose.connection.readyState === 1) {
        console.log("Using the previous database connection.");
        connection.isConnect = true; // Reuse existing connection
        return;
      }

      // If connections exist but the state is not ready, disconnect and reconnect
      console.log("Disconnecting from the previous connection...");
      await mongoose.disconnect();
    }

    // Establish a new connection
    console.log("Establishing a new database connection...");
    await mongoose.connect(mongooDB, { useNewUrlParser: true, useUnifiedTopology: true });
    connection.isConnect = true; // Mark as connected
    console.log("New database connection established.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

// Function to disconnect from the database
async function disconnect() {
  if (!connection.isConnect) {
    console.log("No active database connection to disconnect.");
    return;
  }

  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnect = false; // Update status to disconnected
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
