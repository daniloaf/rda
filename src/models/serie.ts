import mongoose from "../services/mongoose";
import BaseSchema, { IBaseSchema } from "./baseSchema";
import GameDay, { IGameDay } from "./gameDay";
import Team, { ITeam } from "./team";

export interface ISerie extends IBaseSchema {
  startDate: Date;
  endDate: Date;
  month: number;
  year: number;
  teams: Array<ITeam>;
  gameDays: Array<IGameDay>;
}

const SerieSchema = new mongoose.Schema<ISerie>({
  ...BaseSchema.obj,
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

SerieSchema.virtual("startDate").get(function () {
  return this.gameDays?.[0]?.date;
});

SerieSchema.virtual("endDate").get(function () {
  return this.gameDays?.[this.gameDays.length - 1]?.date;
});

const Serie =
  mongoose.models.Serie || mongoose.model<ISerie>("Serie", SerieSchema);

export default Serie;
