import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material'
import TeamRankingData from '../types/TeamRankingData'
import EnhancedTableComponent from './utils/EnchancedTableComponent'

export default function TeamRankingTableComponent({
  title,
  ranking,
}: {
  title: string
  ranking: Array<TeamRankingData>
}) {
  return (
    <Paper sx={{ padding: 1 }} elevation={2}>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <EnhancedTableComponent
        columns={[
          { field: 'color', label: 'Time' },
          { field: 'score', label: 'P' },
          { field: 'wins', label: 'V' },
          { field: 'draws', label: 'E' },
          { field: 'losses', label: 'D' },
        ]}
        data={ranking}
        defaultOrderBy="score"
        defaultOrder="desc"
      />
    </Paper>
  )
}
