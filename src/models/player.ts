import mongoose from "mongoose";
import BaseSchema, { IBaseSchema } from "./baseSchema";

export interface IPlayer extends IBaseSchema {
  fullName: string;
  nickname: string;
  preferredPosition: string;
  birthdate: Date;
  picture: string;
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
  preferredPosition: {
    type: String,
    enum: ["G", "D", "M", "F"],
  },
  birthdate: {
    type: Date,
    required: true,
  },
  picture: {
    type: String,
  },
});

const Player = mongoose.models.Player || mongoose.model<IPlayer>("Player", PlayerSchema)

export default Player
