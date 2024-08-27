import { GetServerSideProps } from 'next'
import { Stack, Grid, FormControl, TextField, Checkbox, FormControlLabel, FormGroup, Button } from '@mui/material'

import PlayerCardComponent from '../../../components/PlayerCardComponent'
import PlayerProfileData from '../../../types/PlayerProfileData'
import * as PlayerServices from '../../../services/player'
import { useRouter } from 'next/router'
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

const playerSchema = yup.object({
  _id: yup.string().notRequired(),
  fullName: yup.string().required(),
  nickname: yup.string().required(),
  birthdate: yup.date().required(),
  active: yup.boolean().required(),
})

type PlayerForm = yup.InferType<typeof playerSchema>

export default function AdminPlayerProfilePage({ player }: { player: PlayerProfileData }) {
  const router = useRouter()
  const { register, handleSubmit } = useForm<PlayerForm>({
    resolver: yupResolver(playerSchema),
    defaultValues: {
      _id: player._id,
      fullName: player.fullName,
      nickname: player.nickname,
      birthdate: new Date(player.birthdate),
      active: player.active,
    },
  })

  const { mutate: updatePlayer } = useMutation<{ _id: string }, unknown, PlayerForm>({
    mutationKey: ['updatePlayer'],
    mutationFn: async (data) => {
      const response = await axios.put(`/api/admin/players/${data._id}`, data)
      return response.data
    },
  })

  const { mutate: createPlayer } = useMutation<{ _id: string }, unknown, PlayerForm>({
    mutationKey: ['createPlayer'],
    mutationFn: async (data: PlayerForm) => {
      const response = await axios.post(`/api/admin/players`, data)
      return response.data
    },
  })

  const onSubmit: SubmitHandler<PlayerForm> = async (data) => {
    if (!data._id) {
      createPlayer(data, {
        onSuccess: (response) => {
          router.push(`/admin/players/${response._id}`)
        },
      })
    } else {
      updatePlayer(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Grid container spacing={1}>
          <Grid item>
            <PlayerCardComponent player={player} width={150} height={200} href={''} />
          </Grid>
          <Grid item xs={10}>
            <Stack spacing={1}>
              <TextField type='text' required label='Nome' {...register('fullName')} />
              <TextField type='text' required label='Apelido' {...register('nickname')} />
              <TextField fullWidth type='date' required {...register('birthdate')} />
              <FormGroup>
                <FormControlLabel label='Ativo' control={<Checkbox {...register('active')} />} />
              </FormGroup>
            </Stack>
          </Grid>
        </Grid>
        <Button type='submit' color='primary' variant='contained'>
          Salvar
        </Button>
      </FormControl>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const playerId = context.query.id as string
  if (playerId === 'new') {
    return {
      props: {
        player: {
          picture: 'https://www.shareicon.net/data/2016/06/30/788946_people_512x512.png',
          nickname: '',
          fullName: '',
          birthdate: new Date().toJSON(),
          position: '',
          active: true,
        },
      },
    }
  }
  const player = await PlayerServices.getPlayerById(playerId)

  return {
    props: {
      player: JSON.parse(JSON.stringify(player)),
    },
  }
}
