import { GetServerSideProps } from 'next';
import {
  Stack,
  Grid,
  FormControl,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import PlayerCardComponent from '../../../components/PlayerCardComponent';
import PlayerProfileData from '../../../types/PlayerProfileData';
import * as PlayerServices from '../../../services/player';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AdminPlayerProfilePage({ player }: { player: PlayerProfileData }) {
  const router = useRouter();
  const [playerData, setPlayerData] = useState(player);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPlayerData({
      ...playerData,
      [name]: value,
    });
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!player._id) {
      const response = await axios.post(`/api/admin/players`, playerData);
      if (response.status === 201) {
        router.replace(`/admin/players/${response.data._id}`);
        setPlayerData(response.data);
      }
    } else {
      const response = await axios.put(`/api/admin/players/${player._id}`, playerData);
      if (response.status === 200) {
        setPlayerData(response.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Grid container spacing={1}>
          <Grid item>
            <PlayerCardComponent player={playerData} width={150} height={200} href={""} />
          </Grid>
          <Grid item xs={10}>
            <Stack spacing={1}>
              <TextField
                name="fullName"
                type="text"
                required
                value={playerData.fullName}
                label="Nome"
                onChange={handleChange}
              />
              <TextField
                name="nickname"
                type="text"
                required
                value={playerData.nickname}
                label="Apelido"
                onChange={handleChange}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data"
                  value={playerData.birthdate}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField fullWidth required {...params} />}
                  onChange={(newValue) => {
                    setPlayerData({ ...playerData, birthdate: newValue ?? '' });
                  }}
                />
              </LocalizationProvider>
              <FormGroup>
                <FormControlLabel
                  name="active"
                  label="Ativo"
                  control={<Checkbox name="active" checked={playerData.active} />}
                  onChange={(_, checked) => {
                    setPlayerData({ ...playerData, active: checked });
                  }}
                />
              </FormGroup>
            </Stack>
          </Grid>
        </Grid>
        <Button type="submit" color="primary" variant="contained">
          Salvar
        </Button>
      </FormControl>
    </form>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const playerId = context.query.id as string;
  if (playerId === 'new') {
    return {
      props: {
        player: {
          picture: 'https://i.stack.imgur.com/gMbrL.jpg',
          nickname: '',
          fullName: '',
          birthdate: new Date().toJSON(),
          position: '',
          active: true,
        },
      },
    };
  }
  const player = await PlayerServices.getPlayerById(playerId);

  return {
    props: {
      player: JSON.parse(JSON.stringify(player)),
    },
  };
};
