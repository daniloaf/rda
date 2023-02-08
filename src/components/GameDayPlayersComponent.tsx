import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import SerieDetailsPlayerData from "../types/admin/SerieDetailsPlayerData";
import DraggablePlayer from "./DraggablePlayer";

export default function GameDayPlayersComponent({
  allPlayers,
  handleDataChange,
}: {
  allPlayers: Array<SerieDetailsPlayerData>;
  handleDataChange: (data: any) => void;
}) {
  const [presentPlayers, setPresentPlayers] = useState(
    allPlayers.sort((p1, p2) => p1.nickname.localeCompare(p2.nickname))
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

    handleDataChange({ presentPlayers, missingPlayers });
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" align="center">
              Presentes
            </Typography>
            <Droppable droppableId="presentPlayers">
              {(provided) => (
                <Grid
                  container
                  spacing={1}
                  padding={1}
                  component={Paper}
                  variant="outlined"
                  minHeight={300}
                  height="100%"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {presentPlayers.map((player, index) => {
                    return (
                      <Grid key={player._id} item xs={4}>
                        <DraggablePlayer player={player} index={index} />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Droppable>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" align="center">
              Faltantes
            </Typography>
            <Droppable droppableId="missingPlayers">
              {(provided) => (
                <Grid
                  container
                  spacing={1}
                  padding={1}
                  component={Paper}
                  variant="outlined"
                  minHeight={300}
                  height="100%"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {missingPlayers.map((player, index) => {
                    return (
                      <Grid key={player._id} item xs={3}>
                        <DraggablePlayer player={player} index={index} />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Droppable>
          </Grid>
        </Grid>
      </DragDropContext>
    </>
  );
}
