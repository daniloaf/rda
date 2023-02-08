import _ from "lodash";
import {
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { FormEventHandler, useState } from "react";
import ActivePlayerData from "../types/admin/ActivePlayerData";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import DraggablePlayer from "./DraggablePlayer";
import axios from "axios";
import { useRouter } from "next/router";

export default function ManageTeamsComponent({
  players,
  serieId,
}: {
  players: Array<ActivePlayerData>;
  serieId: string;
}) {
  const router = useRouter();
  const [availablePlayers, setAvailablePlayers] =
    useState<typeof players>(players);

    const initialTeams: {
      [index: string]: {
        color?: string;
        players: typeof players;
      };
    } = {};
  const defaultColors = ["Branco", "Azul", "Laranja"];
  for (const index in defaultColors) {
    const color = defaultColors[index];
    initialTeams[`team${index}`] = {
      color: color,
      players: [],
    };
  }

  const [teams, setTeams] = useState<{
    [index: string]: {
      color?: string;
      players: typeof players;
    };
  }>({
    availablePlayers: {
      color: undefined,
      players: availablePlayers,
    },
    ...initialTeams,
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourcePlayers = teams[result.source.droppableId];
    const destinationPlayers = teams[result.destination.droppableId];
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const player = sourcePlayers.players[sourceIndex];

    sourcePlayers.players.splice(sourceIndex, 1);
    destinationPlayers.players.splice(destinationIndex, 0, player);

    setTeams({ ...teams });
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const data = Object.keys(teams)
      .filter((key) => teams[key].color !== undefined)
      .map((key) => {
        const team = teams[key];

        return {
          color: team.color,
          players: team.players.map((p) => p._id),
        };
      });

    const response = await axios.put(
      `/api/admin/series/${serieId}/teams`,
      data
    );

    if (response.status === 200) {
      router.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Stack spacing={1}>
            <Typography variant="h5" align="center">
              Atletas
            </Typography>
            <Paper>
              <Droppable droppableId="availablePlayers">
                {(provided) => (
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
              {Object.entries(teams).map(([key, team]) => {
                if (team?.color === undefined) return <></>;

                return (
                  <Grid key={key} item xs={4}>
                    <TextField
                      label="Time"
                      value={team.color}
                      onChange={(event) => {
                        team.color = event.target.value;
                        setTeams({...teams});
                      }}
                      fullWidth
                      required
                    />
                    <Droppable droppableId={key}>
                      {(provided) => (
                        <Stack
                          spacing={1}
                          minHeight={350}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          component={Paper}
                        >
                          {team.players.map((player, index) => (
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
                );
              })}
            </Grid>
          </Stack>
        </DragDropContext>
        <Button type="submit">Salvar</Button>
      </FormControl>
    </form>
  );
}
