import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { GetServerSideProps } from 'next';
import PlayerCardComponent from '../../components/PlayerCardComponent';
import PlayerYearStats from '../../types/PlayerYearStats';
import PlayerYearStatsComponent from '../../components/PlayerYearStatsComponent';
import PlayerDataComponent from '../../components/PlayerDataComponent';
import PlayerProfileData from '../../types/PlayerProfileData';
import * as PlayerServices from '../../services/player';

export default function PlayerProfilePage({
  player,
  playerYearStats,
}: {
  player: PlayerProfileData;
  playerYearStats: Array<PlayerYearStats>;
}) {
  return (
    <Stack sx={{ padding: 1 }} width="100%">
      <Grid container spacing={1}>
        <Grid item>
          <PlayerCardComponent
            player={player}
            width={150}
            height={200}
            href={''}
            linkEndabled={false}
          />
        </Grid>
        <Grid item xs={10}>
          <PlayerDataComponent player={player} />
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={2}>
            <PlayerYearStatsComponent stats={playerYearStats} />
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const playerId = context.query.id as string;
  const player = await PlayerServices.getPlayerById(playerId);
  const playerStats = await PlayerServices.getPlayerStats(playerId);

  return {
    props: {
      player: JSON.parse(JSON.stringify(player)),
      playerYearStats: playerStats,
    },
  };
};
