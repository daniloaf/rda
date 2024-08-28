import Grid from '@mui/material/Grid'
import Fab from '@mui/material/Fab'
import { GetServerSideProps } from 'next'
import PlayerCardComponent from '../../../components/PlayerCardComponent'
import { PlayerCardData } from '../../../types/PlayerCardData'
import AddIcon from '@mui/icons-material/Add'

import * as PlayerServices from '../../../services/player'
import Link from 'next/link'

export default function AdminPlayersPage({ players }: { players: Array<PlayerCardData> }) {
  return (
    <>
      <Grid container padding={1} spacing={1}>
        {players.map((player) => {
          return (
            <Grid item key={player._id} xs={3} sm={3} md={2} lg={2} xl={1}>
              <PlayerCardComponent
                player={player}
                width={75}
                height={80}
                linkEndabled={true}
                href={`/admin/players/${player._id}`}
              />
            </Grid>
          )
        })}
      </Grid>
      <Grid container justifyContent='flex-end'>
        <Fab color='primary' LinkComponent={Link} href='/admin/players/new'>
          <AddIcon />
        </Fab>
      </Grid>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const players = await PlayerServices.getPlayers({})

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  }
}
