import _ from 'lodash'
import { Collapse, Grid, IconButton, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import GameDayPlayerStatsComponent from '../components/GameDayPlayerStatsComponent'
import TeamRankingTableComponent from '../components/TeamRankingTableComponent'
import DateComponent from '../components/DateComponent'
import MatchesListComponent from '../components/MatchesListComponent'
import { useState } from 'react'
import { Stack } from '@mui/system'
import useRequestMutation from '../utils/userRequestMutation'
import GameDaySummaryData from '../types/GameDaySummaryData'
import TeamRankingData from '../types/TeamRankingData'
import GameDayPlayerStats from '../types/GameDayPlayerStats'
import GameDayMatchData from '../types/GameDayMatchData'
import SerieDetailsGameDayData from '../types/admin/SerieDetailsGameDayData'

export default function GameDayComponent({
  gameDay,
}: {
  gameDay: GameDaySummaryData | SerieDetailsGameDayData
}) {
  const [open, setOpen] = useState(false)
  const {
    trigger: fetchData,
    data,
    error,
  } = useRequestMutation<{
    teamRanking: Array<TeamRankingData>
    gameDayPlayerStats: Array<GameDayPlayerStats>
    gameDate: string
    gameDayMatches: Array<GameDayMatchData>
  }>({
    url: `/api/gameDays/${gameDay._id}`,
  })

  const handleOpen = async (open: boolean) => {
    if (open) {
      if (!data) await fetchData()
    }
    setOpen(open)
  }

  return (
    <>
      <Stack direction="row">
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={async () => await handleOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <Typography variant="h6">
          Racha <DateComponent dateString={gameDay.date} />
        </Typography>
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <br />
        {data && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <GameDayPlayerStatsComponent
                title="Atletas"
                playersStats={data?.gameDayPlayerStats}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TeamRankingTableComponent title="Classificação" ranking={data?.teamRanking} />
              <br />
              <MatchesListComponent matches={data?.gameDayMatches} />
            </Grid>
          </Grid>
        )}
      </Collapse>
    </>
  )
}
