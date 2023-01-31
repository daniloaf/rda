import { Schema, model } from "mongoose";
import BaseSchema, { IBaseSchema } from "./baseSchema";

interface ITeam {
  teamId: string;
  goals: number;
}

export interface IMatch extends IBaseSchema {
  date: Date;
  teamA: ITeam;
  teamB: ITeam;
}

const Match = new Schema<IMatch>({
  ...BaseSchema.obj,
  date: {
    type: Date,
    required: true,
  },
  teamA: {
    teamId: {
      type: String,
      required: true,
      ref: "Team",
    },
    goals: {
      type: Number,
      required: true,
    },
  },
  teamB: {
    teamId: {
      type: String,
      required: true,
      ref: "Team",
    },
    goals: {
      type: Number,
      required: true,
    },
  },
});

export default model("match", Match);
