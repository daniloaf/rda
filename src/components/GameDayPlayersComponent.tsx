import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import SerieDetailsPlayerData from "../types/admin/SerieDetailsPlayerData";
import DraggablePlayer from "./DraggablePlayer";

export default function GameDayPlayersComponent({
  initialPresentPlayers,
  initialMissingPlayers,
  handleDataChange,
}: {
  initialPresentPlayers: Array<SerieDetailsPlayerData>;
  initialMissingPlayers: Array<SerieDetailsPlayerData>;
  handleDataChange: (data: any) => void;
}) {
  const [presentPlayers, setPresentPlayers] = useState(
    initialPresentPlayers.sort((p1, p2) => p1.nickname.localeCompare(p2.nickname))
  );

  const [missingPlayers, setMissingPlayers] = useState<typeof initialPresentPlayers>(
    initialMissingPlayers.sort((p1, p2) => p1.nickname.localeCompare(p2.nickname))
  );

  const droppablePlayers: {
    [index: string]: {
      players: typeof initialPresentPlayers;
      setPlayers: typeof setPresentPlayers;
    };
  } = {
    presentPlayers: {
      players: initialPresentPlayers,
      setPlayers: setPresentPlayers,
    },
    missingPlayers: {
      players: initialMissingPlayers,
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

    handleDataChange({ presentPlayers: initialPresentPlayers, missingPlayers: initialMissingPlayers });
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" align="center">
              Presentes
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" align="center">
              Faltantes
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Droppable droppableId="presentPlayers">
              {(provided) => (
                <Grid
                  container
                  padding={1}
                  component={Paper}
                  variant="outlined"
                  minHeight={300}
                  height="100%"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {initialPresentPlayers.map((player, index) => {
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
            <Droppable droppableId="missingPlayers">
              {(provided) => (
                <Grid
                  container
                  padding={1}
                  component={Paper}
                  variant="outlined"
                  minHeight={300}
                  height="100%"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {initialMissingPlayers.map((player, index) => {
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
