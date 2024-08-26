import { Paper } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'
import ActivePlayerData from '../types/admin/ActivePlayerData'

export default function DraggablePlayer({
  index,
  player,
}: {
  index: number
  player: ActivePlayerData
}) {
  return (
    <Draggable draggableId={player._id} index={index}>
      {(provided, snapshot) => (
        <Paper
          elevation={3}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ padding: 1 }}
        >
          {player.nickname}
        </Paper>
      )}
    </Draggable>
  )
}
