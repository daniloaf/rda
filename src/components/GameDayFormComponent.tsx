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
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import SerieDetailsTeamData from "../types/admin/SerieDetailsTeamData";
import DraggablePlayer from "./DraggablePlayer";

export default function GameDayFormComponent({
  gameDay,
  teams,
}: {
  gameDay?: any;
  teams: Array<SerieDetailsTeamData>;
}) {
  const [value, setValue] = useState<dateFns | null>(null);
  const matches = undefined;
  const teamMenuItems = () =>
    teams.map((team) => (
      <MenuItem key={team._id} value={team._id}>
        {team.color}
      </MenuItem>
    ));

  const [presentPlayers, setPresentPlayers] = useState(
    teams
      .map((team) => team.players)
      .flat()
      .sort((p1, p2) => p1.nickname.localeCompare(p2.nickname))
  );

  const [missingPlayers, setMissingPlayers] = useState<typeof presentPlayers>(
    []
  );

  const droppablePlayers: {
    [index: string]: {
      players: typeof presentPlayers;
      setPlayers: typeof setPresentPlayers;
    };
  } = {
    presentPlayers: {
      players: presentPlayers,
      setPlayers: setPresentPlayers,
    },
    missingPlayers: {
      players: missingPlayers,
      setPlayers: setMissingPlayers,
    },
  };

  const [gameDayTeams, setGameDayTeams] = useState([...teams]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourcePlayers = droppablePlayers[result.source.droppableId];
    const destinationPlayers = droppablePlayers[result.destination.droppableId];
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const player = sourcePlayers.players[sourceIndex];

    sourcePlayers.players.splice(sourceIndex, 1);
    destinationPlayers.players.splice(destinationIndex, 0, player);
    sourcePlayers.setPlayers(sourcePlayers.players);
    destinationPlayers.setPlayers(destinationPlayers.players);

    setGameDayTeams([...gameDayTeams]);

    // handleDataChange({
    //   Branco: droppablePlayers.team1Players.players,
    //   Azul: droppablePlayers.team2Players.players,
    //   Laranja: droppablePlayers.team3Players.players,
    // });
  };

  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Data"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Typography variant="h5" align="center">
        Presenças
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h6" align="center">
              Presentes
            </Typography>
            <Droppable droppableId="presentPlayers">
              {(provided, snapshot) => (
                <Stack
                  spacing={1}
                  padding={1}
                  component={Paper}
                  variant="outlined"
                  minHeight={50}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {presentPlayers.map((player, index) => {
                    return <DraggablePlayer player={player} index={index} />;
                  })}
                </Stack>
              )}
            </Droppable>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" align="center">
              Faltantes
            </Typography>
            <Droppable droppableId="missingPlayers">
              {(provided, snapshot) => (
                <Stack
                  spacing={1}
                  padding={1}
                  component={Paper}
                  variant="outlined"
                  minHeight={50}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {missingPlayers.map((player, index) => {
                    return <DraggablePlayer player={player} index={index} />;
                  })}
                </Stack>
              )}
            </Droppable>
          </Grid>
        </Grid>
      </DragDropContext>
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
                      if (!presentPlayers.find((p) => p._id === player._id))
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
