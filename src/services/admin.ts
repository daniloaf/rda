import _ from "lodash";
import * as PlayerServices from "../services/player";
import Player, { IPlayer } from "../models/player";
import Serie from "../models/serie";
import Team, { ITeam } from "../models/team";
import GameDay, { IGameDay } from "../models/gameDay";

export const addPlayer = async (player: IPlayer) => {
  return await PlayerServices.createPlayer(player);
};

export const updatePlayer = async (playerId: string, data: IPlayer) => {
  return await PlayerServices.updatePlayer(playerId, data);
}

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
  const series = await Serie.find({}, ["_id", "month", "year", "gameDays"])
    .populate(["teams.players"])
    .sort({ year: -1, month: -1 });
  const seriesByYear = _(series)
    .map((serie) => serie.toJSON({ virtuals: true }))
    .groupBy("year")
    .value();
  return seriesByYear;
};

export const getSerieDetails = async (serieId: string) => {
  const serie = await Serie.findById(serieId).populate(["teams.players", "gameDays.playersStats.player"]);
  return serie.toJSON({ virtuals: true });
};

export const getActivePlayers = async () => {
  return await Player.find({ active: true });
};

export const setSerieTeams = async (serieId: string, teams: Array<ITeam>) => {
  const serie = await Serie.findById(serieId);
  const newTeams = await Promise.all(
    teams.map(async (team) => {
      if (team._id) {
        return Team.findByIdAndUpdate(team._id, new Team(team), { new: true });
      } else {
        return Team.create(team);
      }
    })
  );
  serie.teams = newTeams;
  await serie.save();
  return serie.toJSON({ virtuals: true });
};

export const addGameDay = async (serieId: string, gameDay: IGameDay) => {
  try {
    const serie = await Serie.findById(serieId);
    serie.gameDays.push(gameDay);
    await serie.save();
    return serie.toJSON({ virtuals: true });
  } catch (err) {
    console.error(err);
  }
};

export const updateGameDay = async (
  serieId: string,
  gameDayId: string,
  gameDay: IGameDay
) => {
  const serie = await Serie.findById(serieId);
  let gameDays: Array<IGameDay> = serie.gameDays;
  const gameDayIndex = gameDays.findIndex(
    (gd: IGameDay) => gd._id === gameDayId
  );
  gameDays[gameDayIndex] = new GameDay(gameDay);
  gameDays = _.sortBy(gameDays, ["date"]);
  serie.gameDays = gameDays;
  await serie.save();
  return serie.toJSON({ virtuals: true });
};

export const addSerie = async ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  const serieExists = await Serie.exists({ month, year });
  if (serieExists)
    throw {
      status: 409,
      message: "Série já existe",
    };
  const serie = await Serie.create({ month, year });
  return serie.toJSON({ virtuals: true });
};
