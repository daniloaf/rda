import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { GetServerSideProps } from "next";
import PlayerCardComponent from "../../components/PlayerCardComponent";
import { PlayerCardData } from "../../types/PlayerCardData";

import * as PlayerServices from "../../services/player";
import dbConnect from "../../services/dbConnect";

export default function PlayersPage({
  players,
}: {
  players: Array<PlayerCardData>;
}) {
  return (
    <Box
      sx={{ display: "inline-flex", position: "fixed", left: 0, width: "80%" }}
    >
      <Grid container spacing={1} padding={5}>
        {players.map((player) => {
          return (
            <Grid item key={player._id} xs={6} sm={4} md={3} lg={3} xl={2}>
              <PlayerCardComponent
                player={player}
                linkEndabled={true}
              ></PlayerCardComponent>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect()
  const players = await PlayerServices.getPlayers();

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
};
