import { FormControl, Grid, Paper, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import ActivePlayerData from "../types/admin/ActivePlayerData";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import DraggablePlayer from "./DraggablePlayer";

export default function ManageTeamsComponent({
  players,
  handleDataChange,
}: {
  players: Array<ActivePlayerData>;
  handleDataChange: (data: any) => void;
}) {
  const [availablePlayers, setAvailablePlayers] =
    useState<typeof players>(players);
  const [team1Players, setTeam1Players] = useState<typeof players>([]);
  const [team2Players, setTeam2Players] = useState<typeof players>([]);
  const [team3Players, setTeam3Players] = useState<typeof players>([]);

  const droppablePlayers: {
    [index: string]: {
      players: typeof players;
      setPlayers: typeof setAvailablePlayers;
    };
  } = {
    availablePlayers: {
      players: availablePlayers,
      setPlayers: setAvailablePlayers,
    },
    team1Players: {
      players: team1Players,
      setPlayers: setTeam1Players,
    },
    team2Players: {
      players: team2Players,
      setPlayers: setTeam2Players,
    },
    team3Players: {
      players: team3Players,
      setPlayers: setTeam3Players,
    },
  };

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

    handleDataChange({
      Branco: droppablePlayers.team1Players.players,
      Azul: droppablePlayers.team2Players.players,
      Laranja: droppablePlayers.team3Players.players,
    });
  };

  return (
    <FormControl>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Stack spacing={1}>
          <Typography variant="h5" align="center">
            Atletas
          </Typography>
          <Paper>
            <Droppable droppableId="availablePlayers">
              {(provided, snapshot) => (
                <Grid
                  container
                  spacing={1}
                  minHeight={50}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {players.map((player, index) => (
                    <Grid item key={player._id}>
                      <DraggablePlayer player={player} index={index} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Droppable>
          </Paper>
          <Typography variant="h5" align="center">
            Times
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <TextField label="Time 1" fullWidth />
              <Droppable droppableId="team1Players">
                {(provided, snapshot) => (
                  <Stack
                    spacing={1}
                    minHeight={350}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    component={Paper}
                  >
                    {team1Players.map((player, index) => (
                      <DraggablePlayer
                        key={player._id}
                        player={player}
                        index={index}
                      />
                    ))}
                  </Stack>
                )}
              </Droppable>
            </Grid>
            <Grid item xs={4}>
              <TextField label="Time 2" fullWidth />
              <Droppable droppableId="team2Players">
                {(provided, snapshot) => (
                  <Stack
                    spacing={1}
                    minHeight={350}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    component={Paper}
                  >
                    {team2Players.map((player, index) => (
                      <DraggablePlayer
                        key={player._id}
                        player={player}
                        index={index}
                      />
                    ))}
                  </Stack>
                )}
              </Droppable>
            </Grid>
            <Grid item xs={4}>
              <TextField label="Time 3" fullWidth />
              <Droppable droppableId="team3Players">
                {(provided, snapshot) => (
                  <Stack
                    spacing={1}
                    minHeight={350}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    component={Paper}
                  >
                    {team3Players.map((player, index) => (
                      <DraggablePlayer
                        key={player._id}
                        player={player}
                        index={index}
                      />
                    ))}
                  </Stack>
                )}
              </Droppable>
            </Grid>
          </Grid>
        </Stack>
      </DragDropContext>
    </FormControl>
  );
}
