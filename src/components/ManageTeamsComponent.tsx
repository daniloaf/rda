import _ from 'lodash'
import { Button, FormControl, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useMemo } from 'react'
import ActivePlayerData from '../types/admin/ActivePlayerData'

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import DraggablePlayer from './DraggablePlayer'
import axios from 'axios'
import { useRouter } from 'next/router'
import SerieDetailsTeamData from '../types/admin/SerieDetailsTeamData'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

const playerSchema = yup.object({
  _id: yup.string().required(),
  nickname: yup.string().required(),
})

const teamSchema = yup.object({
  _id: yup.string().notRequired(),
  color: yup.string().required(),
  players: yup.array(playerSchema).required(),
  captain: playerSchema.optional(),
})

const manageTeamsSchema = yup.object({
  teams: yup.array(teamSchema).required(),
  availablePlayers: yup.array(playerSchema).required(),
})

type ManageTeamsForm = yup.InferType<typeof manageTeamsSchema>

export default function ManageTeamsComponent({
  players,
  serieId,
  teams,
}: {
  players: Array<ActivePlayerData>
  serieId: string
  teams?: Array<SerieDetailsTeamData>
}) {
  const router = useRouter()
  const playersById = useMemo(() => _.keyBy(players, '_id'), [players])
  const teamsPlayers = useMemo(
    () =>
      teams
        ?.map((team) => team.players)
        .flat()
        .sort((a, b) => a.nickname.localeCompare(b.nickname)),
    [teams],
  )
  const availablePlayers = useMemo(
    () =>
      players
        .filter((player) => !teamsPlayers?.some((p) => p._id === player._id))
        .sort((a, b) => a.nickname.localeCompare(b.nickname)),
    [players, teamsPlayers],
  )

  const { control, register, handleSubmit, watch } = useForm<ManageTeamsForm>({
    resolver: yupResolver(manageTeamsSchema),
    defaultValues: {
      teams: teams?.map((team) => ({
        _id: team._id,
        color: team.color,
        captain: playersById[team.captain],
        players: team.players.map((player) => ({
          _id: player._id,
          nickname: player.nickname,
        })),
      })) ?? [
        {
          color: 'Branco',
          players: [],
        },
        {
          color: 'Azul',
          players: [],
        },
        {
          color: 'Laranja',
          players: [],
        },
      ],
      availablePlayers: availablePlayers.map((player) => ({
        _id: player._id,
        nickname: player.nickname,
      })),
    },
  })

  const team0PlayersMethods = useFieldArray({ control, name: 'teams.0.players' })
  const team1PlayersMethods = useFieldArray({ control, name: 'teams.1.players' })
  const team2PlayersMethods = useFieldArray({ control, name: 'teams.2.players' })
  const availablePlayersMethods = useFieldArray({ control, name: 'availablePlayers' })
  const currentTeams = watch('teams')

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const destinationIndex = result.destination.index

    switch (result.destination.droppableId) {
      case 'availablePlayers':
        availablePlayersMethods.insert(destinationIndex, playersById[result.draggableId])
        break
      case '0':
        team0PlayersMethods.insert(destinationIndex, playersById[result.draggableId])
        break
      case '1':
        team1PlayersMethods.insert(destinationIndex, playersById[result.draggableId])
        break
      case '2':
        team2PlayersMethods.insert(destinationIndex, playersById[result.draggableId])
        break
    }

    switch (result.source.droppableId) {
      case 'availablePlayers':
        availablePlayersMethods.remove(result.source.index)
        break
      case '0':
        team0PlayersMethods.remove(result.source.index)
        break
      case '1':
        team1PlayersMethods.remove(result.source.index)
        break
      case '2':
        team2PlayersMethods.remove(result.source.index)
        break
    }
  }

  const { mutate: saveTeams } = useMutation<{ _id: string }, unknown, ManageTeamsForm>({
    mutationKey: ['saveTeams'],
    mutationFn: async (data: ManageTeamsForm) => {
      const teams = data.teams.map((team) => ({
        _id: team._id,
        color: team.color,
        players: team.players.map((player) => ({
          _id: player._id,
        })),
        captain: team.captain?._id,
      }))

      const response = await axios.put(`/api/admin/series/${serieId}/teams`, teams)
      return response.data
    },
  })

  const onSubmit: SubmitHandler<ManageTeamsForm> = async (data) => {
    saveTeams(data, { onSuccess: () => router.reload() })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Stack spacing={1}>
            <Typography variant='h5' align='center'>
              Atletas
            </Typography>
            <Paper>
              <Droppable droppableId='availablePlayers'>
                {(provided) => (
                  <Grid container spacing={1} minHeight={50} ref={provided.innerRef} {...provided.droppableProps}>
                    {availablePlayersMethods.fields.map((player, index) => (
                      <Grid item key={player._id}>
                        <DraggablePlayer player={playersById[player._id]} index={index} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Droppable>
            </Paper>
            <Typography variant='h5' align='center'>
              Times
            </Typography>
            <Grid container spacing={1}>
              {currentTeams.map((team, index) => {
                if (team?.color === undefined) return <></>

                return (
                  <Grid key={team.color} item xs={4}>
                    <TextField label='Time' fullWidth required {...register(`teams.${index}.color`)} />
                    <Droppable droppableId={String(index)}>
                      {(provided) => (
                        <Stack
                          spacing={1}
                          minHeight={350}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          component={Paper}
                        >
                          {team.players.map((player, index) => (
                            <DraggablePlayer key={player._id} player={playersById[player._id]} index={index} />
                          ))}
                        </Stack>
                      )}
                    </Droppable>
                    <TextField label='Capitão' select fullWidth {...register(`teams.${index}.captain._id`)}>
                      {team.players?.map((player) => {
                        return (
                          <MenuItem key={player._id} value={player._id}>
                            {player.nickname}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </Grid>
                )
              })}
            </Grid>
          </Stack>
        </DragDropContext>
        <Button type='submit'>Salvar</Button>
      </FormControl>
    </form>
  )
}
