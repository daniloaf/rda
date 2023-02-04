import _ from "lodash";
import * as PlayerServices from "../services/player";
import { IPlayer } from "../models/player";
import Serie, { ISerie } from "../models/serie";

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

export const getSeriesSummaryByYear = async () => {
  const series = await Serie.find({}, [
    "_id",
    "month",
    "year",
    "startDate",
    "endDate",
    "gameDays"
  ]).populate(["teams.players"]).sort({ startDate: -1 });
  const seriesByYear = _.groupBy(series, "year");
  return seriesByYear;
};

export const getSerieDetails = async (serieId: string) => {
  const serie = await Serie.findById(serieId).populate(["teams.players"]);
  return serie;
};
