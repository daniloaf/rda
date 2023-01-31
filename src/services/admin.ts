import uuid from "uuid";
import * as PlayerServices from "../services/player";
import * as ImageServices from "../services/image";
import * as S3Services from "../services/s3";
import { IPlayer } from "../models/player";

export const addPlayer = async (player: IPlayer) => {
  return await PlayerServices.createPlayer(player);
};

export const setPlayerPicture = async (playerId: string, picture: any) => {
  // const player = await PlayerServices.getPlayerById(playerId)
  // if (!player) {
  //   throw {
  //     status: 404,
  //     message: "Player not found",
  //   }
  // }
  // const file = ctx.request.file
  // const resizedFile = await ImageServices.resizeImage(file.buffer, 150, 200)
  // const fileName = `rda/pictures/${uuid.v4()}`
  // await S3Services.uploadObject(fileName, resizedFile)
  // const imageUrl = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${fileName}`
  // await PlayerServices.updatePlayer(playerId, { picture: imageUrl })
  // ctx.body = { url: imageUrl }
};
