import { FilterQuery } from "mongoose";
import Player, { IPlayer } from "../models/player";

export const getPlayerById = async (playerId: string) => {
  return Player.findById(playerId);
};

export const getPlayers = async (query?: FilterQuery<IPlayer>) => {
  return Player.find(query);
};

export const createPlayer = async ({
  fullName,
  nickname,
  preferredPosition,
  birthdate,
  picture,
}: IPlayer) => {
  return Player.create({
    fullName,
    nickname,
    preferredPosition,
    birthdate,
    picture,
  });
};

export const updatePlayer = async (
  playerId: string,
  { fullName, nickname, preferredPosition, birthdate, picture }: IPlayer
) => {
  return Player.findByIdAndUpdate(playerId, {
    $set: { fullName, nickname, preferredPosition, birthdate, picture },
  });
};
