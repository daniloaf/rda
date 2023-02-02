import mongoose from "../services/mongoose";
import BaseSchema, { IBaseSchema } from "./baseSchema";
import Team from "./team";

interface ITeam {
  team: string;
  goals: number;
}

export interface IMatch extends IBaseSchema {
  teamA: ITeam;
  teamB: ITeam;
}

const MatchSchema = new mongoose.Schema<IMatch>({
  ...BaseSchema.obj,
  teamA: {
    team: {
      type: String,
      required: true,
      ref: Team,
    },
    goals: {
      type: Number,
      required: true,
    },
  },
  teamB: {
    team: {
      type: String,
      required: true,
      ref: Team,
    },
    goals: {
      type: Number,
      required: true,
    },
  },
});

const Match =
  mongoose.models.Match || mongoose.model<IMatch>("Match", MatchSchema);

export default Match;
