import mongoose from "../services/mongoose";
import BaseSchema, { IBaseSchema } from "./baseSchema";

export interface IPlayer extends IBaseSchema {
  fullName: string;
  nickname: string;
  position: string;
  birthdate: Date;
  picture: string;
  active: boolean;
}

const PlayerSchema = new mongoose.Schema<IPlayer>({
  ...BaseSchema.obj,
  fullName: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: "any",
  },
  birthdate: {
    type: Date,
    required: true,
  },
  picture: {
    type: String,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Player =
  mongoose.models.Player as mongoose.Model<IPlayer> || mongoose.model<IPlayer>("Player", PlayerSchema);

export default Player;
