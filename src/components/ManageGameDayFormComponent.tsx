import {
  Button,
  IconButton,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'

import { useRouter } from 'next/router'
import SerieDetailsGameDayData from '../types/admin/SerieDetailsGameDayData'
import SerieDetailsTeamData from '../types/admin/SerieDetailsTeamData'
import GameDayPlayersComponent from './GameDayPlayersComponent'
import ActivePlayerData from '../types/admin/ActivePlayerData'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

const playerSchema = yup.object({
  _id: yup.string().required(),
  nickname: yup.string().required(),
  position: yup.string().required(),
})

const teamMatchSchema = yup.object({
  team: yup.string().required(),
  goals: yup.number().required(),
  goalkeeper: yup.string().nullable(),
})

const matchSchema = yup.object({
  teamA: teamMatchSchema,
  teamB: teamMatchSchema,
})

const teamPunishmentSchema = yup.object({
  team: yup.string().required(),
  points: yup.number().required(),
  reason: yup.string().required(),
})

const playerStatsSchema = yup.object({
  player: playerSchema.required(),
  goals: yup.number().required(),
  assists: yup.number().required(),
  yellowCards: yup.number().required(),
  redCards: yup.number().required(),
})

const manageGameDaySchema = yup.object({
  date: yup.string().required(),
  matches: yup.array(matchSchema).required(),
  presentPlayersStats: yup.array(playerStatsSchema).required(),
  missingPlayersStats: yup.array(playerStatsSchema).required(),
  teamPunishments: yup.array(teamPunishmentSchema).required(),
})

export type ManageGameDayForm = yup.InferType<typeof manageGameDaySchema>

export default function ManageGameDayFormComponent({
  gameDay,
  teams,
  serieId,
  players,
}: {
  gameDay?: SerieDetailsGameDayData
  teams: Array<SerieDetailsTeamData>
  players: Array<ActivePlayerData>
  serieId: string
}) {
  const methods = useForm<ManageGameDayForm>({
    resolver: yupResolver(manageGameDaySchema),
    defaultValues: {
      date: gameDay?.date.split('T')[0] ?? '',
      matches: gameDay?.matches,
      presentPlayersStats: gameDay?.playersStats ?? [],
      teamPunishments: gameDay?.teamPunishments,
      missingPlayersStats: players
        .filter((player) => !gameDay?.playersStats?.some((stats) => stats.player._id === player._id))
        .map((player) => ({
          player,
          goals: 0,
          assists: 0,
          yellowCards: 0,
          redCards: 0,
        })),
    },
  })
  const { register, handleSubmit, getValues, setValue, watch } = methods
  const presentPlayersStats = watch('presentPlayersStats')

  const teamMenuItems = (baseKey: string) =>
    teams.map((team) => (
      <MenuItem key={`${baseKey}-${team._id}`} value={team._id}>
        {team.color}
      </MenuItem>
    ))

  const teamGoalkeeperMenuItems = (baseKey: string) => {
    return presentPlayersStats
      .filter((player) => player.player.position === 'Goleiro')
      .map((goalkeeper) => (
        <MenuItem key={`${baseKey}-${goalkeeper.player._id}`} value={goalkeeper.player._id}>
          {goalkeeper.player.nickname}
        </MenuItem>
      ))
  }

  const router = useRouter()

  const { mutate: addGameDay } = useMutation<{ _id: string }, unknown, ManageGameDayForm>({
    mutationKey: ['addGameDay'],
    mutationFn: async (data: ManageGameDayForm) => {
      const response = await axios.post(`/api/admin/series/${serieId}/gameDays`, data)
      return response.data
    },
  })

  const { mutate: updateGameDay } = useMutation<{ _id: string }, unknown, ManageGameDayForm>({
    mutationKey: ['updateGameDay'],
    mutationFn: async (data: ManageGameDayForm) => {
      const response = await axios.put(`/api/admin/series/${serieId}/gameDays/${gameDay?._id}`, data)
      return response.data
    },
  })

  const onSubmit: SubmitHandler<ManageGameDayForm> = async (data) => {
    if (!gameDay) {
      addGameDay(data, {
        onSuccess: () => {
          router.reload()
        },
      })
    } else {
      updateGameDay(data, {
        onSuccess: () => {
          router.reload()
        },
      })
    }
  }

  const handleGoalkeeperTeamChange = (goalkeeper: ActivePlayerData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const teamSide = event.target.value
    getValues('matches').forEach((match, index) => {
      if (teamSide === 'teamA') setValue(`matches.${index}.teamA.goalkeeper`, goalkeeper._id)
      else if (teamSide === 'teamB') setValue(`matches.${index}.teamB.goalkeeper`, goalkeeper._id)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <FormControl fullWidth>
          <Grid container spacing={1} padding={1}>
            <Grid item xs={12}>
              <Controller
                name='date'
                control={methods.control}
                render={({ field }) => <TextField fullWidth type='date' required {...field} />}
              />
              {/* <TextField fullWidth type='date' required {...register('date')} /> */}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5' align='center'>
                Presenças
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <GameDayPlayersComponent />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h5' align='center'>
                Estatísticas
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {teams.map((team) => {
                  return (
                    <Grid key={team._id} item xs={12} md={4}>
                      <Paper variant='outlined'>
                        <Typography variant='h6' align='center'>
                          Time {team.color}
                        </Typography>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Atleta</TableCell>
                                <TableCell>G</TableCell>
                                <TableCell>A</TableCell>
                                <TableCell>CA</TableCell>
                                <TableCell>CV</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {team.players.map((player) => {
                                const playerStatsIndex = presentPlayersStats.findIndex(
                                  (stats) => stats.player._id === player._id,
                                )
                                if (playerStatsIndex === -1) return <></>

                                return (
                                  <TableRow key={player._id}>
                                    <TableCell>{player.nickname}</TableCell>
                                    <TableCell>
                                      <TextField
                                        inputProps={{
                                          inputMode: 'numeric',
                                          step: 1,
                                        }}
                                        type='number'
                                        required
                                        variant='standard'
                                        {...register(`presentPlayersStats.${playerStatsIndex}.goals`)}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        inputProps={{
                                          inputMode: 'numeric',
                                          step: 1,
                                        }}
                                        type='number'
                                        required
                                        variant='standard'
                                        {...register(`presentPlayersStats.${playerStatsIndex}.assists`)}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        inputProps={{
                                          inputMode: 'numeric',
                                          step: 1,
                                        }}
                                        type='number'
                                        required
                                        variant='standard'
                                        {...register(`presentPlayersStats.${playerStatsIndex}.yellowCards`)}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        inputProps={{
                                          inputMode: 'numeric',
                                          step: 1,
                                        }}
                                        type='number'
                                        required
                                        variant='standard'
                                        {...register(`presentPlayersStats.${playerStatsIndex}.redCards`)}
                                      />
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h5' align='center'>
                Goleiros
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Goleiro</TableCell>
                      <TableCell>Gols</TableCell>
                      <TableCell>Assistências</TableCell>
                      <TableCell>CA</TableCell>
                      <TableCell>CV</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {presentPlayersStats
                      .filter((player) => player.player.position === 'Goleiro')
                      .map((goalkeeper) => {
                        const playerStatsIndex = presentPlayersStats.findIndex(
                          (stats) => stats.player._id === goalkeeper.player._id,
                        )
                        if (playerStatsIndex === -1) return <></>
                        return (
                          <TableRow key={goalkeeper.player._id}>
                            <TableCell>{goalkeeper.player.nickname}</TableCell>
                            <TableCell>
                              <TextField
                                inputProps={{
                                  inputMode: 'numeric',
                                  step: 1,
                                }}
                                type='number'
                                required
                                variant='standard'
                                {...register(`presentPlayersStats.${playerStatsIndex}.goals`)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                inputProps={{
                                  inputMode: 'numeric',
                                  step: 1,
                                }}
                                type='number'
                                required
                                variant='standard'
                                {...register(`presentPlayersStats.${playerStatsIndex}.assists`)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                inputProps={{
                                  inputMode: 'numeric',
                                  step: 1,
                                }}
                                type='number'
                                required
                                variant='standard'
                                {...register(`presentPlayersStats.${playerStatsIndex}.yellowCards`)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                inputProps={{
                                  inputMode: 'numeric',
                                  step: 1,
                                }}
                                type='number'
                                required
                                variant='standard'
                                {...register(`presentPlayersStats.${playerStatsIndex}.redCards`)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                label='Time'
                                sx={{ width: 200 }}
                                onChange={handleGoalkeeperTeamChange(goalkeeper.player)}
                                select
                              >
                                <MenuItem value='teamA'>Casa</MenuItem>
                                <MenuItem value='teamB'>Visitante</MenuItem>
                              </TextField>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h5' align='center'>
                Partidas
              </Typography>
              <MarchesForm teamGoalkeeperMenuItems={teamGoalkeeperMenuItems} teamMenuItems={teamMenuItems} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5' align='center'>
                Punições
              </Typography>
              <TeamPunishmentsForm teamMenuItems={teamMenuItems} />
            </Grid>
          </Grid>
          <Button type='submit'>Salvar</Button>
        </FormControl>
      </FormProvider>
    </form>
  )
}

function MarchesForm({
  teamGoalkeeperMenuItems,
  teamMenuItems,
}: {
  teamGoalkeeperMenuItems: (baseKey: string) => JSX.Element[]
  teamMenuItems: (baseKey: string) => JSX.Element[]
}) {
  const { register, watch, control } = useFormContext<ManageGameDayForm>()
  const matches = watch('matches')

  return (
    <Grid item xs={12}>
      <Stack spacing={1}>
        {matches.map((match, index) => {
          return (
            <Paper key={`match-${index}`} variant='outlined'>
              <FormControl>
                <Grid container padding={1} spacing={1} direction='row' justifyContent='center' alignItems='center'>
                  <Grid item>
                    <Typography>Partida {index + 1}</Typography>
                  </Grid>
                  <Grid item>
                    <Controller
                      name={`matches.${index}.teamA.goalkeeper`}
                      control={control}
                      render={({ field }) => (
                        <TextField label='Goleiro' sx={{ width: 200 }} select defaultValue='' {...field}>
                          <MenuItem value={''}>Convidado</MenuItem>
                          {teamGoalkeeperMenuItems(`match-${index}`)}
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Controller
                      name={`matches.${index}.teamA.team`}
                      control={control}
                      render={({ field }) => (
                        <TextField label='Time' sx={{ width: 200 }} select defaultValue='' {...field}>
                          {teamMenuItems(`match-${index}`)}
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      sx={{ width: 50 }}
                      required
                      {...register(`matches.${index}.teamA.goals`)}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant='body1' align='center'>
                      X
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      sx={{ width: 50 }}
                      required
                      {...register(`matches.${index}.teamB.goals`)}
                    />
                  </Grid>
                  <Grid item>
                    <Controller
                      name={`matches.${index}.teamB.team`}
                      control={control}
                      render={({ field }) => (
                        <TextField label='Time' sx={{ width: 200 }} select defaultValue='' {...field}>
                          {teamMenuItems(`match-${index}`)}
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Controller
                      name={`matches.${index}.teamB.goalkeeper`}
                      control={control}
                      render={({ field }) => (
                        <TextField label='Goleiro' sx={{ width: 200 }} select defaultValue='' {...field}>
                          <MenuItem value={''}>Convidado</MenuItem>
                          {teamGoalkeeperMenuItems(`match-${index}`)}
                        </TextField>
                      )}
                    />
                  </Grid>
                </Grid>
              </FormControl>
            </Paper>
          )
        })}
      </Stack>
    </Grid>
  )
}

function TeamPunishmentsForm({ teamMenuItems }: { teamMenuItems: (baseKey: string) => JSX.Element[] }) {
  const { control, register } = useFormContext<ManageGameDayForm>()
  const punishmentsMethods = useFieldArray({ control, name: 'teamPunishments' })

  const handleAddPunishment = () => {
    punishmentsMethods.append({ team: '', points: 0, reason: '' })
  }

  const handleRemovePunishment = (index: number) => () => {
    punishmentsMethods.remove(index)
  }

  return (
    <Stack spacing={1}>
      {punishmentsMethods.fields.map((punishment, index) => {
        return (
          <Paper key={`punishment${index}`} variant='outlined'>
            <Grid item>
              <FormControl>
                <Grid container padding={1} spacing={1} direction='row' justifyContent='center' alignItems='center'>
                  <Grid item>
                    <TextField
                      required
                      label='Time'
                      sx={{ width: 200 }}
                      select
                      {...register(`teamPunishments.${index}.team`)}
                    >
                      {teamMenuItems(`punishment-${index}`)}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      inputProps={{
                        inputMode: 'numeric',
                        step: 1,
                      }}
                      type='number'
                      sx={{ width: 100 }}
                      label='Pontos'
                      required
                      {...register(`teamPunishments.${index}.points`)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField label='Motivo' required fullWidth {...register(`teamPunishments.${index}.reason`)} />
                  </Grid>
                  <Grid item>
                    <IconButton color='primary' onClick={handleRemovePunishment(index)}>
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
          </Paper>
        )
      })}
      <Button onClick={handleAddPunishment}>Adicionar</Button>
    </Stack>
  )
}
