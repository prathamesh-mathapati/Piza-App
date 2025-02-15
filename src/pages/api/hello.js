// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "@/utlis/db";

export default async function handler(req, res) {
  try {
    // Establish DB connection
    await db.connect();

    // Perform any necessary DB operations here
    res.status(200).json({ message: "Successfully connected to the DB" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to connect to DB", error: error.message });
  }
}