"use client"

import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import GameDayPlayerStatsComponent from "../components/GameDayPlayerStatsComponent";
import TeamRankingTableComponent from "../components/TeamRankingTableComponent";
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
          playersStats={[]}
        />
        <br />
        <TeamRankingTableComponent title="Times" ranking={[]} />
      </Paper>
    </>
  );
}