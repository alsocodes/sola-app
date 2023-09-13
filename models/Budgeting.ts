import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import { Month } from "./Month";

enum BudgetingItemType {
  in = "in",
  out = "out",
}
class BudgetingItem {
  @prop()
  _id: string;

  @prop()
  name: string;

  @prop()
  amount: number;
}

export class Budgeting {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  month: Month;

  @prop()
  ins: BudgetingItem[];

  @prop()
  outs: BudgetingItem[];

  @prop()
  totalIn: number;

  @prop()
  totalOut: number;

  @prop({ default: () => Date.now() })
  createdAt: number;

  @prop()
  updatedAt: number;
}
