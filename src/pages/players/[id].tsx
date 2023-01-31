import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { PlayerCardData } from "../../types/PlayerCardData";
import { GetServerSideProps } from "next";
import PlayerCardComponent from "../../components/PlayerCardComponent";
import PlayerYearStats from "../../types/PlayerYearStats";
import PlayerYearStatsComponent from "../../components/PlayerYearStatsComponent";
import PlayerDataComponent from "../../components/PlayerDataComponent";
import PlayerProfileData from "../../types/PlayerProfileData";
import dbConnect from "../../services/dbConnect";
import { getPlayerById } from "../../services/player";

// const playerData = {
//   fullName: "Danilo Araújo de Freitas",
//   preferredPosition: "F",
//   birthdate: new Date("1989-05-19").toISOString(),
// };

export default function PlayerProfilePage({
  player,
  playerYearStats,
  playerProfileData,
}: {
  player: PlayerCardData;
  playerYearStats: Array<PlayerYearStats>;
  playerProfileData: PlayerProfileData;
}) {
  return (
    <Stack
      spacing={1}
      sx={{ display: "inline-flex", position: "fixed", left: 0, width: "80%" }}
    >
      <Grid container spacing={0} component={Paper}>
        <Grid item>
          <PlayerCardComponent player={player} width={150} height={200} />
        </Grid>
        <Grid item>
          <PlayerDataComponent player={playerProfileData} />
        </Grid>
      </Grid>
      <Paper>
        <PlayerYearStatsComponent stats={playerYearStats} />
      </Paper>
    </Stack>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect()
  const playerId = context.query.id as string
  const player = await getPlayerById(playerId)
  
  const playerYearStats = [
    {
      id: 1,
      year: 2022,
      goals: 5,
      assists: 3,
      attendance: 12,
      wins: 6,
      draws: 4,
      losses: 2,
    },
    {
      id: 2,
      year: 2021,
      goals: 5,
      assists: 3,
      attendance: 12,
      wins: 6,
      draws: 4,
      losses: 2,
    },
    {
      id: 3,
      year: 2020,
      goals: 5,
      assists: 3,
      attendance: 12,
      wins: 6,
      draws: 4,
      losses: 2,
    },
  ];
  const playerProfileData = {
    fullName: "Danilo Araújo de Freitas",
    birthdate: "1989-05-19",
    preferredPosition: "F",
  };
  return {
    props: {
      player: JSON.parse(JSON.stringify(player)),
      playerYearStats,
      playerProfileData,
    },
  };
};
