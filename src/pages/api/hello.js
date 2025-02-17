import db from "@/utlis/db";
const mongooDB = process.env.DB_URL;

export default async function handler(req, res) {
  try {
    // Establish DB connection
    await db.connect();

    // Perform any necessary DB operations here
    res.status(200).json({ message: mongooDB });
  } catch (error) {
    console.error(error);

    // Ensure that the error response is always in JSON format
    res.status(500).json({
      message: "Failed to connect to DB",
      error: error.message,
    });
  }
}
