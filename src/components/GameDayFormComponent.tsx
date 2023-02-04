import {
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SerieDetailsTeamData from "../types/admin/SerieDetailsTeamData";

export default function GameDayFormComponent({
  gameDay,
  teams,
}: {
  gameDay?: any;
  teams: Array<SerieDetailsTeamData>;
}) {
  const matches = undefined;
  const teamMenuItems = () =>
    teams.map((team) => (
      <MenuItem key={team._id} value={team._id}>
        {team.color}
      </MenuItem>
    ));
  return (
    <FormControl fullWidth>
      <Typography variant="h5" align="center">
        Gols e Assistências
      </Typography>
      <Grid container spacing={1}>
        {teams.map((team) => {
          return (
            <Grid key={team._id} item xs={4}>
              <Paper variant="outlined">
                <Typography align="center">Time {team.color}</Typography>
                <TableContainer>
                  <TableHead>
                    <TableRow>
                      <TableCell>Atleta</TableCell>
                      <TableCell>G</TableCell>
                      <TableCell>A</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {team.players.map((player) => {
                      return (
                        <TableRow key={player._id}>
                          <TableCell>{player.nickname}</TableCell>
                          <TableCell width={10}>
                            <TextField
                              inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                              }}
                              sx={{ width: 50 }}
                            ></TextField>
                          </TableCell>
                          <TableCell width={10}>
                            <TextField
                              inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                              }}
                              sx={{ width: 50 }}
                            ></TextField>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </TableContainer>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Typography variant="h5" align="center">
        Partidas
      </Typography>
      <Stack spacing={1}>
        {matches ||
          Array(6)
            .fill(null)
            .map((match, i) => {
              return (
                <Paper variant="outlined">
                  <Grid
                    container
                    padding={1}
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      <Select sx={{ width: 200 }}>{teamMenuItems()}</Select>
                    </Grid>
                    <Grid item>
                      <TextField
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        sx={{ width: 50 }}
                      ></TextField>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" align="center">
                        X
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        sx={{ width: 50 }}
                      ></TextField>
                    </Grid>
                    <Grid item xs={3}>
                      <Select sx={{ width: 200 }}>{teamMenuItems()}</Select>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
      </Stack>
    </FormControl>
  );
}
