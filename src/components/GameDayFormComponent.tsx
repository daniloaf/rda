import { Button, SelectChangeEvent } from "@mui/material";
import {
  FormControl,
  FormGroup,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEventHandler, useState } from "react";
import SerieDetailsTeamData from "../types/admin/SerieDetailsTeamData";
import GameDayPlayersComponent from "./GameDayPlayersComponent";

export default function GameDayFormComponent({
  gameDay,
  teams,
  serieId,
}: {
  gameDay?: any;
  teams: Array<SerieDetailsTeamData>;
  serieId: string;
}) {
  const teamMenuItems = () =>
    teams.map((team) => (
      <MenuItem key={team._id} value={team._id}>
        {team.color}
      </MenuItem>
    ));

  const router = useRouter();

  const [date, setValue] = useState<dateFns | null>(null);
  const [matches, setMatches] = useState(
    Array(6)
      .fill(null)
      .map(() => ({
        teamA: {
          team: "",
          goals: 0,
        },
        teamB: {
          team: "",
          goals: 0,
        },
      }))
  );

  const allPlayers = [];
  const initialPlayersStats: {
    [index: string]: {
      player: string;
      goals: number;
      assists: number;
      score: number;
    };
  } = {};

  for (const team of teams) {
    for (const player of team.players) {
      initialPlayersStats[player._id] = {
        player: player._id,
        goals: 0,
        assists: 0,
        score: 0,
      };
      allPlayers.push(player);
    }
  }
  const [playersStats, serPlayerStats] = useState(initialPlayersStats);

  const [matchPlayers, setMatchPlayers] = useState({
    presentPlayers: allPlayers,
    missingPlayers: [],
  });

  const handlePlayersChange = (data: any) => {
    for (const missingPlayer of data.missingPlayers) {
      delete playersStats[missingPlayer._id];
    }
    setMatchPlayers(data);
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const data = {
      date: date,
      matches: matches,
      playersStats: Object.values(playersStats),
    };

    console.log(data);

    const response = await axios.post(
      `/api/admin/series/${serieId}/gameDay`,
      data
    );
    
    if (response.status === 200) {
      router.reload();
    }
  };

  const handleTeamChange =
    (team: { team: string; goals: number }) => (event: SelectChangeEvent) => {
      team.team = event.target.value;
      setMatches([...matches]);
    };

  const handleTeamGoalsChange =
    (team: { team: string; goals: number }) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      team.goals = parseInt(event.target.value);
      setMatches([...matches]);
    };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <Stack spacing={1}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Data"
              value={date}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField required {...params} />}
            />
          </LocalizationProvider>
          <Typography variant="h5" align="center">
            Presenças
          </Typography>
          <GameDayPlayersComponent
            allPlayers={allPlayers}
            handleDataChange={handlePlayersChange}
          />
          <br />
          <Typography variant="h5" align="center">
            Gols e Assistências
          </Typography>
          <Grid container spacing={1}>
            {teams.map((team) => {
              return (
                <Grid key={team._id} item xs={4}>
                  <Paper variant="outlined">
                    <Typography variant="h6" align="center">
                      Time {team.color}
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Atleta</TableCell>
                            <TableCell>G</TableCell>
                            <TableCell>A</TableCell>
                            <TableCell>N</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {team.players.map((player) => {
                            if (
                              !matchPlayers.presentPlayers.find(
                                (p) => p._id === player._id
                              )
                            )
                              return <></>;
                            return (
                              <TableRow key={player._id}>
                                <TableCell>{player.nickname}</TableCell>
                                <TableCell width={10}>
                                  <TextField
                                    inputProps={{
                                      inputMode: "numeric",
                                      pattern: "[0-9]*",
                                    }}
                                    required
                                    value={playersStats[player._id].goals}
                                    onChange={(event) => {
                                      playersStats[player._id].goals = parseInt(
                                        event.target.value
                                      );
                                      serPlayerStats({ ...playersStats });
                                    }}
                                    variant="standard"
                                    sx={{ width: 30, height: 30 }}
                                  ></TextField>
                                </TableCell>
                                <TableCell width={10}>
                                  <TextField
                                    inputProps={{
                                      inputMode: "numeric",
                                      pattern: "[0-9]*",
                                    }}
                                    required
                                    value={playersStats[player._id].assists}
                                    onChange={(event) => {
                                      playersStats[player._id].assists =
                                        parseInt(event.target.value);
                                      serPlayerStats({ ...playersStats });
                                    }}
                                    variant="standard"
                                    sx={{ width: 30 }}
                                  ></TextField>
                                </TableCell>
                                <TableCell width={10}>
                                  <TextField
                                    inputProps={{
                                      inputMode: "numeric",
                                      pattern: "[0-9]*",
                                    }}
                                    required
                                    value={playersStats[player._id].score}
                                    onChange={(event) => {
                                      playersStats[player._id].score = parseInt(
                                        event.target.value
                                      );
                                      console.log(
                                        playersStats[player._id],
                                        playersStats
                                      );
                                      serPlayerStats({ ...playersStats });
                                    }}
                                    variant="standard"
                                    sx={{ width: 30 }}
                                  ></TextField>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
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
            {matches.map((match, index) => {
              return (
                <Paper key={index} variant="outlined">
                  <FormControl>
                    <Grid
                      container
                      padding={1}
                      spacing={1}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <FormControl>
                          <Select
                            required
                            sx={{ width: 200 }}
                            value={match.teamA.team}
                            onChange={handleTeamChange(match.teamA)}
                          >
                            {teamMenuItems()}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <TextField
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
                          value={match.teamA.goals}
                          onChange={handleTeamGoalsChange(match.teamA)}
                          sx={{ width: 50 }}
                          required
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
                          value={match.teamB.goals}
                          onChange={handleTeamGoalsChange(match.teamB)}
                          sx={{ width: 50 }}
                          required
                        ></TextField>
                      </Grid>
                      <Grid item>
                        <FormControl>
                          <Select
                            required
                            sx={{ width: 200 }}
                            value={match.teamB.team}
                            onChange={handleTeamChange(match.teamB)}
                          >
                            {teamMenuItems()}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Paper>
              );
            })}
          </Stack>
        </Stack>
        <Button type="submit">Salvar</Button>
      </FormControl>
    </form>
  );
}
