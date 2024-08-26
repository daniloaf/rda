import mongoose from '../services/mongoose';
import BaseSchema, { IBaseSchema } from './baseSchema';
import Player from './player';
import Team, { ITeam } from './team';

interface IMatchTeam {
  team: string | ITeam;
  goals: number;
  goalkeeper?: string;
}

export interface IMatch extends IBaseSchema {
  teamA: IMatchTeam;
  teamB: IMatchTeam;
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
    goalkeeper: {
      type: String,
      ref: Player,
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
    goalkeeper: {
      type: String,
      ref: Player,
    },
  },
});

const Match = mongoose.models.Match || mongoose.model<IMatch>('Match', MatchSchema);

export default Match;
