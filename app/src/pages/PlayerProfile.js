import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import PlayerCard from "../components/PlayerCard";
import PlayerData from "../components/PlayerData";
import PlayerYearStats from "../components/PlayerYearStats";

const playerData = {
  fullName: "Danilo Araújo de Freitas",
  preferredPosition: "F",
  birthdate: new Date("1989-05-19").toISOString(),
};

const PlayerProfile = ({ playerId }) => {
  return (
    <Stack
      height={800}
      width={800}
      spacing={2}
      sx={{ display: "inline-flex", justifyContent: "flex-start" }}
    >
      <Grid container spacing={0} component={Paper}>
        <Grid item>
          <PlayerCard
            data={{
              givenName: "Gordão",
              image: "https://i.stack.imgur.com/gMbrL.jpg",
            }}
            width={150}
            height={200}
          />
        </Grid>
        <Grid item>
          <PlayerData data={playerData} />
        </Grid>
      </Grid>
      <PlayerYearStats />
    </Stack>
  );
};

export default PlayerProfile;
