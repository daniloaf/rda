import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import Player from "../models/player";
import Serie from "../models/serie";
import Team from "../models/team";

const createPlayers = async () => {
  const playersData = [
    {
      fullName: "Antônio Marques",
      nickname: "Antônio",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Arthur Freire",
      nickname: "TeyTey",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Arthur Ribeiro",
      nickname: "Arthur",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Carlos Vitor",
      nickname: "Carlos",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Daniel Gondim",
      nickname: "Daniel",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Danilo Freitas",
      nickname: "Gordão",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Fábio Ferreira",
      nickname: "Bandana",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Felipe Diogo",
      nickname: "Pinhu",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Flávio Pimentel",
      nickname: "Flavinho",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Igor Dantas",
      nickname: "Igor",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Isaac Silva",
      nickname: "Isaac",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Jaime César",
      nickname: "Jaime",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Jefferson",
      nickname: "Jeff",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Joeu Souza",
      nickname: "Joeu",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "João Victor",
      nickname: "Painha",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Leandro Brito",
      nickname: "Angolano",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Paulo Ouriques",
      nickname: "Paulinho",
      position: "Goleiro",
      birthdate: "1987-02-20",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Pedro",
      nickname: "Pedrão",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Pedro Saraiva",
      nickname: "Saraiva",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Raniere Aguiar",
      nickname: "Raniere",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Raulino Maracajá",
      nickname: "Raulino",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Ricardo Baiano",
      nickname: "Baiano",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Thiago Fernando",
      nickname: "Thiago Fernando",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
    {
      fullName: "Thiago Freire",
      nickname: "Thiago Freire",
      position: "Goleiro",
      birthdate: "1989-05-19",
      picture: "https://i.stack.imgur.com/gMbrL.jpg",
    },
  ];

  let players = [];
  for (let playerData of playersData) {
    players.push(await new Player(playerData).save());
  }

  return players;
};

const createSeries = async (players: Array<any>) => {
  const octoberTeams = [
    await new Team({
      color: "Azul",
      players: players.slice(7, 14).map((p) => p._id),
    }).save(),
    await new Team({
      color: "Laranja",
      players: players.slice(14).map((p) => p._id),
    }).save(),
    await new Team({
      color: "Branco",
      players: players.slice(0, 7).map((p) => p._id),
    }).save(),
  ];
  const novemberTeams = [
    await new Team({
      color: "Azul",
      players: players.slice(0, 7).map((p) => p._id),
    }).save(),
    await new Team({
      color: "Laranja",
      players: players.slice(7, 14).map((p) => p._id),
    }).save(),
    await new Team({
      color: "Branco",
      players: players.slice(14).map((p) => p._id),
    }).save(),
  ];

  const seriesData = [
    {
      startDate: new Date("2022-10-07"),
      endDate: new Date("2022-10-28"),
      month: 10,
      year: 2022,
      teams: octoberTeams,
      gameDays: [
        {
          date: new Date("2022-10-07"),
          matches: [
            {
              teamA: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[2]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[2]._id,
                goals: 2,
              },
            },
            {
              teamA: {
                team: octoberTeams[1]._id,
                goals: 1,
              },
              teamB: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[2]._id,
                goals: 2,
              },
              teamB: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[2]._id,
                goals: 3,
              },
              teamB: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
            },
          ],
          playersStats: players.map((p, i) => ({
            player: p._id,
            goals: Math.floor(i / 10),
            assists: Math.floor((players.length - i - 1) / 10),
            score: 5,
          })),
        },
        {
          date: new Date("2022-01-14"),
          matches: [
            {
              teamA: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[2]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[2]._id,
                goals: 2,
              },
            },
            {
              teamA: {
                team: octoberTeams[1]._id,
                goals: 1,
              },
              teamB: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[2]._id,
                goals: 2,
              },
              teamB: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[2]._id,
                goals: 3,
              },
              teamB: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
            },
          ],
          playersStats: players.map((p, i) => ({
            player: p._id,
            goals: Math.floor(i / 10),
            assists: Math.floor((players.length - i - 1) / 10),
            score: 6,
          })),
        },
        {
          date: new Date("2022-10-21"),
          matches: [
            {
              teamA: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[2]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[2]._id,
                goals: 2,
              },
            },
            {
              teamA: {
                team: octoberTeams[1]._id,
                goals: 1,
              },
              teamB: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[2]._id,
                goals: 2,
              },
              teamB: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[2]._id,
                goals: 3,
              },
              teamB: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
            },
          ],
          playersStats: players.map((p, i) => ({
            player: p._id,
            goals: Math.floor(i / 10),
            assists: Math.floor((players.length - i - 1) / 10),
            score: 5,
          })),
        },
        {
          date: new Date("2022-10-28"),
          matches: [
            {
              teamA: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[2]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
              teamB: {
                team: octoberTeams[2]._id,
                goals: 2,
              },
            },
            {
              teamA: {
                team: octoberTeams[1]._id,
                goals: 1,
              },
              teamB: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[2]._id,
                goals: 2,
              },
              teamB: {
                team: octoberTeams[0]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: octoberTeams[2]._id,
                goals: 3,
              },
              teamB: {
                team: octoberTeams[1]._id,
                goals: 0,
              },
            },
          ],
          playersStats: players.map((p, i) => ({
            player: p._id,
            goals: Math.floor(i / 10),
            assists: Math.floor((players.length - i - 1) / 10),
            score: 4,
          })),
        },
      ],
    },
    {
      startDate: new Date("2022-11-03"),
      endDate: new Date("2022-11-17"),
      month: 11,
      year: 2022,
      teams: novemberTeams,
      gameDays: [
        {
          date: new Date("2022-11-03"),
          matches: [
            {
              teamA: {
                team: novemberTeams[0]._id,
                goals: 0,
              },
              teamB: {
                team: novemberTeams[1]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[0]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[1]._id,
                goals: 2,
              },
              teamB: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[1]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[0]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[0]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[1]._id,
                goals: 2,
              },
            },
          ],
          playersStats: players.map((p, i) => ({
            player: p._id,
            goals: i,
            assists: players.length - i - 1,
            score: 5,
          })),
        },
        {
          date: new Date("2022-11-10"),
          matches: [
            {
              teamA: {
                team: novemberTeams[0]._id,
                goals: 0,
              },
              teamB: {
                team: novemberTeams[1]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[0]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[1]._id,
                goals: 2,
              },
              teamB: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[1]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[0]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[0]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[1]._id,
                goals: 2,
              },
            },
          ],
          playersStats: players.map((p, i) => ({
            player: p._id,
            goals: i,
            assists: players.length - i - 1,
            score: 5,
          })),
        },
        {
          date: new Date("2022-11-17"),
          matches: [
            {
              teamA: {
                team: novemberTeams[0]._id,
                goals: 0,
              },
              teamB: {
                team: novemberTeams[1]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[0]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[1]._id,
                goals: 2,
              },
              teamB: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[1]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[0]._id,
                goals: 0,
              },
            },
            {
              teamA: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[0]._id,
                goals: 1,
              },
            },
            {
              teamA: {
                team: novemberTeams[2]._id,
                goals: 1,
              },
              teamB: {
                team: novemberTeams[1]._id,
                goals: 2,
              },
            },
          ],
          playersStats: players.map((p, i) => ({
            player: p._id,
            goals: i,
            assists: players.length - i - 1,
            score: 5,
          })),
        },
      ],
    },
  ];

  let series = [];
  for (let serie of seriesData) {
    series.push(await new Serie(serie).save());
  }
  return series;
};

const main = async () => {
  // await dbConnect()
  const players = await createPlayers();
  console.log(`Created ${players.length} players`);
  const series = await createSeries(players);
  console.log(`Created ${series.length} series`);
};

main()
  .then(() => process.exit())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
