import { Paper, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import GameDayPlayerStatsComponent from "../components/GameDayPlayerStatsComponent";
import TeamRankingTableComponent from "../components/TeamRankingTableComponent";
import dbConnect from "../services/dbConnect";
import GameDayPlayerStats from "../types/GameDayPlayerStats";
import TeamRankingData from "../types/TeamRankingData";

export default function Home({
  latestTeamRanking,
  latestGameDayPlayerStats,
}: {
  latestTeamRanking: Array<TeamRankingData>;
  latestGameDayPlayerStats: Array<GameDayPlayerStats>;
}) {
  return (
    <>
      <Paper variant="outlined" sx={{ padding: 1 }}>
        <Typography>Racha 02/02/2023</Typography>
        <GameDayPlayerStatsComponent
          title="Atletas"
          playersStats={latestGameDayPlayerStats}
        />
        <br />
        <TeamRankingTableComponent title="Times" ranking={latestTeamRanking} />
      </Paper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const latestTeamRanking = [
    {
      color: "Azul",
      score: 9,
      victories: 3,
      draws: 0,
      losses: 0,
    },
    {
      color: "Laranja",
      score: 4,
      victories: 1,
      draws: 1,
      losses: 2,
    },
    {
      color: "Branco",
      score: 1,
      victories: 0,
      draws: 1,
      losses: 3,
    },
  ];

  const latestGameDayPlayerStats = [
    {
      playerId: "1",
      nickname: "Gordão",
      goals: 1,
      assists: 1,
      score: 1,
      victories: 1,
      draws: 1,
      losses: 1,
    },
    {
      playerId: "2",
      nickname: "Vieira",
      goals: 1,
      assists: 1,
      score: 1,
      victories: 1,
      draws: 1,
      losses: 1,
    },
    {
      playerId: "3",
      nickname: "Zé",
      goals: 1,
      assists: 1,
      score: 1,
      victories: 1,
      draws: 1,
      losses: 1,
    },
  ];

  return {
    props: {
      latestTeamRanking,
      latestGameDayPlayerStats,
    },
  };
};
