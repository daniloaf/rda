import { Schema, model } from "mongoose";
import BaseSchema, { IBaseSchema } from "./baseSchema";

export interface ITeam extends IBaseSchema {
  color: String;
  players: Array<string>;
}

const Team = new Schema<ITeam>({
  ...BaseSchema.obj,
  color: {
    type: String,
    required: true,
  },
  players: [
    {
      type: String,
      ref: "Player",
    },
  ],
});

export default model("team", Team);
