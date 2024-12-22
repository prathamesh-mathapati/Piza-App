// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "@/utlis/db";

export default function handler(req, res) {
  db.connect()
  res.status(200).json({ name: "John Doe" });
}
