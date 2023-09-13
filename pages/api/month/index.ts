import { MonthModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import moment from "moment";
interface CreateMonthBody {
  value: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    // for retrieving todos list
    const rows = await MonthModel.find({}).limit(10).sort({ value: -1 }).lean();
    const count = await MonthModel.count({});
    res.status(200).json({ count, rows });
  } else if (req.method === "POST") {
    // creating a single todo
    const { value } = req.body as CreateMonthBody;
    if (!value) return res.status(400).json({ error: "Bad request" });

    const check = await MonthModel.findOne({ value });
    if (check) return res.status(400).json({ error: "Month is already exist" });

    const month = new MonthModel({
      value,
      name: moment(new Date(value)).format("YYYY-MMM"),
    });
    await month.save();

    res.status(200).json(month.toJSON());
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
