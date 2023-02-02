import mongoose from "../services/mongoose";
import BaseSchema, { IBaseSchema } from "./baseSchema";
import GameDay, { IGameDay } from "./gameDay";
import Team, { ITeam } from "./team";

export interface ISerie extends IBaseSchema {
  startDate: Date;
  endDate: Date;
  month: number;
  year: Number;
  teams: Array<ITeam>;
  gameDays: Array<IGameDay>;
}

const SerieSchema = new mongoose.Schema<ISerie>({
  ...BaseSchema.obj,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  teams: [
    {
      type: Team.schema,
    },
  ],
  gameDays: [
    {
      type: GameDay.schema,
    },
  ],
});

const Serie =
  mongoose.models.Serie || mongoose.model<ISerie>("Serie", SerieSchema);

export default Serie;
