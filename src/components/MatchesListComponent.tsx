import { Grid, Paper, Typography } from '@mui/material'
import GameDayMatchData from '../types/GameDayMatchData'

const MatchDetailsComponent = ({ match }: { match: GameDayMatchData }) => {
  return (
    <Grid
      container
      component={Paper}
      padding={1}
      sx={{ marginTop: 1 }}
      direction="row"
      justifyContent="center"
      alignItems="center"
      elevation={2}
    >
      <Grid item xs={2}>
        <Typography variant="body1" align="center">
          {match.teamA.color.toUpperCase()}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1" align="center">
          {match.teamA.goals}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1" align="center">
          X
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1" align="center">
          {match.teamB.goals}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1" align="center">
          {match.teamB.color.toUpperCase()}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default function MatchesListComponent({ matches }: { matches: Array<GameDayMatchData> }) {
  return (
    <Paper sx={{ padding: 1 }} elevation={2}>
      <Typography variant="h6" align="center">
        Jogos
      </Typography>
      {matches.map((match, i) => (
        <MatchDetailsComponent key={i} match={match} />
      ))}
    </Paper>
  )
}
