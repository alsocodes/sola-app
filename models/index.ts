import { Month } from "@/models/Month";
import { getModelForClass } from "@typegoose/typegoose";
import { Budgeting } from "./Budgeting";

export const MonthModel = getModelForClass(Month);
export const BudgetingModel = getModelForClass(Budgeting);
