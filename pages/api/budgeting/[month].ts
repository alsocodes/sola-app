import { BudgetingModel, MonthModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import moment from "moment";
import { nanoid } from "nanoid";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

enum TypeEnum {
  in = "in",
  out = "out",
}

class CreateBudgetingItemDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsEnum(TypeEnum)
  type: TypeEnum;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { month } = req.query;
  if (req.method === "GET") {
    // for retrieving todos list
    const budget = await BudgetingModel.findOne({ "month.name": month }).lean();
    if (!budget) {
      const monthData = await MonthModel.findOne({ name: month }).lean();
      const create = new BudgetingModel({
        month: monthData,
        ins: [],
        outs: [],
        totalIn: 0,
        totalOut: 0,
      });
      const created = await create.save();
      return res.status(200).json(created);
    }
    res.status(200).json(budget);
  } else if (req.method === "POST") {
    const { id, amount, name, type } = req.body as CreateBudgetingItemDTO;
    // const monthData = await MonthModel.findOne({ name: month }).lean();

    const data = await BudgetingModel.findOne({ "month.name": month });
    if (!data) return res.status(404).json({ error: "Data not found" });

    if (!id) {
      const itemCheck =
        type === "in"
          ? data?.ins?.find((dd) => dd.name === name)
          : data?.outs?.find((dd) => dd.name === name);
      if (itemCheck)
        return res.status(400).json({ error: "Item name is already exist" });

      if (type === "in") {
        data.ins = [
          ...data.ins,
          { name: name, amount: amount, _id: nanoid(9) },
        ];
      } else {
        data.outs = [
          ...data.outs,
          { name: name, amount: amount, _id: nanoid(9) },
        ];
      }
      await data.save();

      res.status(200).json(data.toJSON());
    } else {
      const itemCheck =
        type === "in"
          ? data?.ins?.find((dd) => dd.name === name && dd._id !== id)
          : data?.outs?.find((dd) => dd.name === name && dd._id !== id);
      if (itemCheck)
        return res.status(400).json({ error: "Item name is already exist" });
      const key = type === "in" ? "ins" : "outs";
      data[key] = data[key].map((dd) => {
        if (dd._id === id) {
          return {
            ...dd,
            name: name,
            amount: amount,
          };
        }
        return dd;
      });
      await data.save();
      res.status(200).json(data.toJSON());
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
