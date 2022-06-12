import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import PlayerCard from "../components/PlayerCard";
import PlayerData from "../components/PlayerData";
import PlayerYearStats from "../components/PlayerYearStats";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayer } from "../http/players";

// const playerData = {
//   fullName: "Danilo Araújo de Freitas",
//   preferredPosition: "F",
//   birthdate: new Date("1989-05-19").toISOString(),
// };

const PlayerProfile = () => {
  const params = useParams();
  const [playerData, setPlayerData] = useState({});

  useEffect(() => {
    getPlayer(params.playerId).then(setPlayerData);
  }, []);

  return (
    <Stack
      spacing={1}
      sx={{ display: "inline-flex", position: "fixed", left: 0, width: "80%" }}
    >
      <Grid container spacing={0} component={Paper}>
        <Grid item>
          <PlayerCard data={playerData} width={150} height={200} />
        </Grid>
        <Grid item>
          <PlayerData data={playerData} />
        </Grid>
      </Grid>
      <Paper>
        <PlayerYearStats />
      </Paper>
    </Stack>
  );
};

export default PlayerProfile;
