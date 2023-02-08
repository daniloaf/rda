import _ from "lodash";
import * as PlayerServices from "../services/player";
import Player, { IPlayer } from "../models/player";
import Serie from "../models/serie";
import Team, { ITeam } from "../models/team";
import { IGameDay } from "../models/gameDay";

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
    "gameDays",
  ])
    .populate(["teams.players"])
    .sort({ startDate: -1 });
  const seriesByYear = _.groupBy(series, "year");
  return seriesByYear;
};

export const getSerieDetails = async (serieId: string) => {
  const serie = await Serie.findById(serieId).populate(["teams.players"]);
  return serie;
};

export const getActivePlayers = async () => {
  return await Player.find({ active: true });
};

export const setSerieTeams = async (serieId: string, teams: Array<ITeam>) => {
  const serie = await Serie.findById(serieId);
  console.log(teams)
  await Team.deleteMany({
    _id: { $in: serie.teams.map((team: ITeam) => team._id) },
  });
  const newTeams = await Team.insertMany(teams.map((team) => new Team(team)));
  console.log(newTeams)
  serie.teams = newTeams;
  await serie.save();
  return serie;
};

export const addGameDay = async (serieId: string, gameDay: IGameDay) => {
  try {
    const serie = await Serie.findById(serieId);
    serie.gameDays.push(gameDay);
    await serie.save();
    return serie;
  } catch (err) {
    console.error(err);
  }
};
