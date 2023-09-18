import Grid from "@mui/material/Grid";
import { GetServerSideProps } from "next";
import PlayerCardComponent from "../../components/PlayerCardComponent";
import { PlayerCardData } from "../../types/PlayerCardData";

import * as PlayerServices from "../../services/player";

export default function PlayersPage({
  players,
}: {
  players: Array<PlayerCardData>;
}) {
  return (
    <Grid container padding={1} spacing={1}>
      {players.map((player) => {
        return (
          <Grid item key={player._id} xs={3} sm={3} md={2} lg={2} xl={1}>
            <PlayerCardComponent
              player={player}
              width={75}
              height={80}
              linkEndabled={true}
              href={`/players/${player._id}`}
            ></PlayerCardComponent>
          </Grid>
        );
      })}
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const players = await PlayerServices.getPlayers({});

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
};
