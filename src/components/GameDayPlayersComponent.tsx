import { Grid, Paper, Typography } from '@mui/material'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import DraggablePlayer from './DraggablePlayer'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ManageGameDayForm } from './ManageGameDayFormComponent'

export default function GameDayPlayersComponent() {
  const { control } = useFormContext<ManageGameDayForm>()
  const presentPlayersStatsMethods = useFieldArray({ control, name: 'presentPlayersStats' })
  const missingPlayersStatsMethods = useFieldArray({ control, name: 'missingPlayersStats' })

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    switch (result.source.droppableId) {
      case 'presentPlayers':
        presentPlayersStatsMethods.remove(result.source.index)
        break
      case 'missingPlayers':
        missingPlayersStatsMethods.remove(result.source.index)
        break
    }

    switch (result.destination.droppableId) {
      case 'presentPlayers':
        presentPlayersStatsMethods.insert(
          result.destination.index,
          missingPlayersStatsMethods.fields[result.source.index],
        )
        break
      case 'missingPlayers':
        missingPlayersStatsMethods.insert(
          result.destination.index,
          presentPlayersStatsMethods.fields[result.source.index],
        )
        break
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant='h6' align='center'>
            Presentes
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h6' align='center'>
            Faltantes
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Droppable droppableId='presentPlayers'>
            {(provided) => (
              <Grid
                container
                padding={1}
                component={Paper}
                variant='outlined'
                minHeight={300}
                height='100%'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {presentPlayersStatsMethods.fields.map((player, index) => {
                  return (
                    <Grid key={player.player._id} item xs={4}>
                      <DraggablePlayer player={player.player} index={index} />
                    </Grid>
                  )
                })}
              </Grid>
            )}
          </Droppable>
        </Grid>
        <Grid item xs={6}>
          <Droppable droppableId='missingPlayers'>
            {(provided) => (
              <Grid
                container
                padding={1}
                component={Paper}
                variant='outlined'
                minHeight={300}
                height='100%'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {missingPlayersStatsMethods.fields.map((player, index) => {
                  return (
                    <Grid key={player.player._id} item xs={3}>
                      <DraggablePlayer player={player.player} index={index} />
                    </Grid>
                  )
                })}
              </Grid>
            )}
          </Droppable>
        </Grid>
      </Grid>
    </DragDropContext>
  )
}
