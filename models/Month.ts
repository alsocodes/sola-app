import { prop } from "@typegoose/typegoose";
import moment from "moment";
import { nanoid } from "nanoid";

export class Month {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  name: string;

  @prop()
  value: string;

  @prop({ default: () => Date.now() })
  createdAt: number;

  @prop()
  updatedAt: number;
}
