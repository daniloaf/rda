import mongoose from '../services/mongoose';
import BaseSchema, { IBaseSchema } from './baseSchema';
import Player from './player';

export interface ITeam extends IBaseSchema {
  color: string;
  players: Array<string>;
  captain: string;
}

const TeamSchema = new mongoose.Schema<ITeam>({
  ...BaseSchema.obj,
  color: {
    type: String,
    required: true,
  },
  players: [
    {
      type: String,
      ref: Player,
    },
  ],
  captain: {
    type: String,
    ref: Player,
  },
});

const Team =
  (mongoose.models.Team as mongoose.Model<ITeam>) || mongoose.model<ITeam>('Team', TeamSchema);

export default Team;
