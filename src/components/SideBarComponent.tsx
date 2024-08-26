import { Paper, Stack, Typography } from '@mui/material'
import GameDayPlayerStats from '../types/GameDayPlayerStats'
import TeamRankingData from '../types/TeamRankingData'
import GameDayPlayerStatsComponent from './GameDayPlayerStatsComponent'
import TeamRankingTableComponent from './TeamRankingTableComponent'

export default function SideBarComponent({
  currentTeamRanking,
  currentPlayersStats,
}: {
  currentTeamRanking: TeamRankingData[]
  currentPlayersStats: GameDayPlayerStats[]
}) {
  return (
    <Stack spacing={1} component={Paper} variant="outlined">
      <Typography variant="h5" align="center">
        Série atual
      </Typography>
      <TeamRankingTableComponent title="Classificação" ranking={currentTeamRanking} />
      <GameDayPlayerStatsComponent
        title={'Atletas'}
        playersStats={currentPlayersStats}
        abbreviate={true}
        limit={5}
      />
    </Stack>
  )
}
