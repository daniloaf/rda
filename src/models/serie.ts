import { Schema, model } from "mongoose";
import BaseSchema, { IBaseSchema } from "./baseSchema";
import Match, { IMatch } from "./match";
import Team, { ITeam } from "./team";

interface IPlayerStats {
  playerId: string;
  amount: number;
}

interface IGameDay {
  matches: IMatch;
  goals: Array<IPlayerStats>;
  assists: Array<IPlayerStats>;
}

interface ISerie extends IBaseSchema {
  month: number;
  year: Number;
  teams: Array<ITeam>;
  gameDays: Array<IGameDay>;
}

const Serie = new Schema<ISerie>({
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
      matches: {
        type: Match.schema,
      },
      goals: [
        {
          playerId: {
            type: String,
            ref: "Player",
          },
          amount: {
            type: Number,
          },
        },
      ],
      assists: [
        {
          playerId: {
            type: String,
            ref: "Player",
          },
          amount: {
            type: Number,
          },
        },
      ],
    },
  ],
});

export default model("serie", Serie);
