import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Stack } from '@mui/system'
import * as SerieServices from '../../services/serie'
import { SerieDetailsData } from '../../types/series'
import Typography from '@mui/material/Typography'
import getMonthName from '../../utils/getMonthName'
import DateComponent from '../../components/DateComponent'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import GameDayComponent from '../../components/GameDayComponent'
import TeamRankingData from '../../types/TeamRankingData'
import GameDayPlayerStats from '../../types/GameDayPlayerStats'
import TeamRankingTableComponent from '../../components/TeamRankingTableComponent'
import GameDayPlayerStatsComponent from '../../components/GameDayPlayerStatsComponent'

export default function SerieDetailsPage({
  serie,
  teamRanking,
  playersStats,
}: {
  serie: SerieDetailsData
  teamRanking: TeamRankingData[]
  playersStats: GameDayPlayerStats[]
}) {
  return (
    <Stack spacing={1}>
      <Typography variant="h5">
        Série {getMonthName(serie.month, 'LLLL')}/{serie.year}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Typography variant="body1">
          <b>Início: </b>
          <DateComponent dateString={serie.startDate} />
        </Typography>
        <Typography>
          <b>Fim: </b>
          <DateComponent dateString={serie.endDate} />
        </Typography>
      </Stack>
      <br />
      <Stack component={Paper} spacing={1} padding={1}>
        <Typography variant="h5" align="center">
          Times da série
        </Typography>
        <Grid container spacing={2} padding={1} justifyContent="center">
          {serie.teams.map((team) => {
            return (
              <Grid key={team._id} item xs={12} md={3}>
                <Paper sx={{ padding: 1 }}>
                  <Typography variant="subtitle2">Time {team.color}</Typography>
                  {team.players.map((player) => (
                    <Typography variant="body1" key={player._id}>
                      {player.nickname}
                    </Typography>
                  ))}
                </Paper>
              </Grid>
            )
          })}
        </Grid>
        <TeamRankingTableComponent title="Classificação" ranking={teamRanking} />
        <GameDayPlayerStatsComponent title={'Atletas'} playersStats={playersStats} />
        <Typography variant="h5" align="center">
          Rachas
        </Typography>
        {serie.gameDays.map((gameDay) => {
          return <GameDayComponent key={gameDay._id} gameDay={gameDay} />
        })}
      </Stack>
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.query.id as string
  const serieDetails = await SerieServices.getSerieDetails(id)
  const { teamRanking, playersStats } = await SerieServices.getSerieStats(id)

  return {
    props: {
      serie: JSON.parse(JSON.stringify(serieDetails)),
      teamRanking: JSON.parse(JSON.stringify(teamRanking)),
      playersStats: JSON.parse(JSON.stringify(playersStats)),
    },
  }
}
