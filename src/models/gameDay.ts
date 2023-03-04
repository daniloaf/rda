import mongoose from "../services/mongoose";
import BaseSchema, { IBaseSchema } from "./baseSchema";
import MatchSchema, { IMatch } from "./match";
import Player from "./player";

interface IPlayerStats {
  player: string;
  goals: number;
  assists: number;
  score?: number;
  yellowCards: number;
  redCards: number;
}

export interface IGameDay extends IBaseSchema {
  date: Date;
  matches: Array<IMatch>;
  playersStats: Array<IPlayerStats>;
}

const GameDaySchema = new mongoose.Schema<IGameDay>({
  ...BaseSchema.obj,
  date: {
    type: Date,
    required: true,
  },
  matches: [
    {
      type: MatchSchema.schema,
    },
  ],
  playersStats: [
    {
      _id: false,
      player: {
        type: String,
        ref: Player,
        required: true,
      },
      goals: {
        type: Number,
        required: true,
      },
      assists: {
        type: Number,
        required: true,
      },
      score: {
        type: Number,
      },
      yellowCards: {
        type: Number,
      },
      redCards: {
        type: Number,
      },
    },
  ],
});

const GameDay =
  mongoose.models.GameDay || mongoose.model<IGameDay>("GameDay", GameDaySchema);

export default GameDay;
