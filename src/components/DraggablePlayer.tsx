import { Paper } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'

interface DraggablePlayerProps {
  index: number
  player: {
    _id: string
    nickname: string
  }
}

export default function DraggablePlayer({ index, player }: DraggablePlayerProps) {
  return (
    <Draggable draggableId={player._id} index={index}>
      {(provided) => (
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
