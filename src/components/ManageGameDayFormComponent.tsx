import _ from 'lodash';
import { parseJSON } from 'date-fns';
import { Button, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import SerieDetailsGameDayData, {
  TeamPunishmentData,
} from '../types/admin/SerieDetailsGameDayData';
import SerieDetailsTeamData from '../types/admin/SerieDetailsTeamData';
import GameDayPlayersComponent from './GameDayPlayersComponent';
import SerieDetailsMatchTeamData from '../types/admin/SerieDetailsMatchTeamData';
import SerieDetailsMatchData from '../types/admin/SerieDetailsMatchData';
import ActivePlayerData from '../types/admin/ActivePlayerData';

export default function ManageGameDayFormComponent({
  gameDay,
  teams,
  serieId,
  players,
}: {
  gameDay?: SerieDetailsGameDayData;
  teams: Array<SerieDetailsTeamData>;
  players: Array<ActivePlayerData>;
  serieId: string;
}) {
  const teamMenuItems = () =>
    teams.map((team) => (
      <MenuItem key={team._id} value={team._id}>
        {team.color}
      </MenuItem>
    ));

  const teamGoalkeeperMenuItems = () => {
    return matchPlayers.presentPlayers
      .filter((player) => player.position === 'Goleiro')
      .map((goalkeeper) => (
        <MenuItem key={goalkeeper._id} value={goalkeeper._id}>
          {goalkeeper.nickname}
        </MenuItem>
      ));
  };

  const router = useRouter();

  const [date, setDate] = useState<Date | null>(
    gameDay?.date ? parseJSON(gameDay.date) : new Date()
  );
  const [matches, setMatches] = useState<Array<SerieDetailsMatchData>>(
    gameDay?.matches ??
      Array(6)
        .fill(null)
        .map(() => ({
          teamA: {
            team: '',
            goals: 0,
            goalkeeper: undefined,
          },
          teamB: {
            team: '',
            goals: 0,
            goalkeeper: undefined,
          },
        }))
  );
  const [teamPunishments, setTeamPunishments] = useState<Array<TeamPunishmentData>>(
    gameDay?.teamPunishments ?? []
  );

  let initialPlayersStats: {
    [index: string]: {
      player: ActivePlayerData;
      goals: number;
      assists: number;
      yellowCards: number;
      redCards: number;
    };
  };

  if (gameDay?.playersStats) {
    initialPlayersStats = _.keyBy(
      gameDay.playersStats.map((stats) => ({
        player: stats.player,
        goals: stats.goals,
        assists: stats.assists,
        yellowCards: stats.yellowCards,
        redCards: stats.redCards,
      })),
      (stats) => stats.player._id
    );
  } else {
    initialPlayersStats = _.keyBy(
      players.map((player) => ({
        player: player,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        redCards: 0,
      })),
      (stats) => stats.player._id
    );
  }

  const [playersStats, serPlayerStats] = useState(initialPlayersStats);

  const [matchPlayers, setMatchPlayers] = useState({
    presentPlayers: players.filter((player) => !!initialPlayersStats[player._id]),
    missingPlayers: players.filter((player) => !initialPlayersStats[player._id]),
  });

  const handlePlayersChange = (data: any) => {
    for (const missingPlayer of data.missingPlayers) {
      delete playersStats[missingPlayer._id];
    }
    for (const presentPlayer of data.presentPlayers) {
      if (!playersStats[presentPlayer._id]) {
        playersStats[presentPlayer._id] = {
          player: presentPlayer,
          goals: 0,
          assists: 0,
          yellowCards: 0,
          redCards: 0,
        };
      }
    }
    setMatchPlayers(data);
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const data = {
      date: date,
      matches: matches,
      playersStats: Object.values(playersStats),
      teamPunishments: teamPunishments,
    };

    let response;
    if (!gameDay) {
      response = await axios.post(`/api/admin/series/${serieId}/gameDays`, data);
    } else {
      response = await axios.put(`/api/admin/series/${serieId}/gameDays/${gameDay?._id}`, data);
    }

    if (response.status === 200) {
      router.reload();
    }
  };

  const handleTeamChange =
    (team: SerieDetailsMatchTeamData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      team.team = event.target.value;
      setMatches([...matches]);
    };

  const handleTeamGoalsChange =
    (team: SerieDetailsMatchTeamData) => (event: ChangeEvent<HTMLInputElement>) => {
      team.goals = parseInt(event.target.value);
      setMatches([...matches]);
    };

  const handleGoalkeeperTeamChange =
    (goalkeeper: ActivePlayerData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const teamSide = event.target.value;
      matches.forEach((match) => {
        if (teamSide === 'teamA') match.teamA.goalkeeper = goalkeeper;
        else if (teamSide === 'teamB') match.teamB.goalkeeper = goalkeeper;
      });
      setMatches([...matches]);
    };

  const handleTeamGoalkeeperChange =
    (team: SerieDetailsMatchTeamData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const goalkeeperId = event.target.value;
      team.goalkeeper = playersStats[goalkeeperId]?.player;
      setMatches([...matches]);
    };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <Grid container spacing={1} padding={1}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data"
                value={date}
                inputFormat="dd/MM/yyyy"
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField fullWidth required {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Presenças
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <GameDayPlayersComponent
              initialPresentPlayers={matchPlayers.presentPlayers}
              initialMissingPlayers={matchPlayers.missingPlayers}
              handleDataChange={handlePlayersChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Estatísticas
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {teams.map((team) => {
                return (
                  <Grid key={team._id} item xs={12} md={4}>
                    <Paper variant="outlined">
                      <Typography variant="h6" align="center">
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
                            {team.players
                              .filter(
                                (player) =>
                                  !!matchPlayers.presentPlayers.find((p) => p._id === player._id)
                              )
                              .map((player) => {
                                return (
                                  <TableRow key={player._id}>
                                    <TableCell>{player.nickname}</TableCell>
                                    <TableCell>
                                      <TextField
                                        inputProps={{
                                          inputMode: 'numeric',
                                          step: 1,
                                        }}
                                        type="number"
                                        required
                                        value={playersStats[player._id].goals}
                                        onChange={(event) => {
                                          playersStats[player._id].goals =
                                            parseInt(event.target.value) ?? 0;
                                          serPlayerStats({ ...playersStats });
                                        }}
                                        variant="standard"
                                      ></TextField>
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        inputProps={{
                                          inputMode: 'numeric',
                                          step: 1,
                                        }}
                                        type="number"
                                        required
                                        value={playersStats[player._id].assists}
                                        onChange={(event) => {
                                          playersStats[player._id].assists =
                                            parseInt(event.target.value) ?? 0;
                                          serPlayerStats({ ...playersStats });
                                        }}
                                        variant="standard"
                                      ></TextField>
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        inputProps={{
                                          inputMode: 'numeric',
                                          step: 1,
                                        }}
                                        type="number"
                                        required
                                        value={playersStats[player._id].yellowCards}
                                        onChange={(event) => {
                                          playersStats[player._id].yellowCards =
                                            parseInt(event.target.value) ?? 0;
                                          serPlayerStats({ ...playersStats });
                                        }}
                                        variant="standard"
                                      ></TextField>
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        inputProps={{
                                          inputMode: 'numeric',
                                          step: 1,
                                        }}
                                        type="number"
                                        required
                                        value={playersStats[player._id].redCards}
                                        onChange={(event) => {
                                          playersStats[player._id].redCards =
                                            parseInt(event.target.value) ?? 0;
                                          serPlayerStats({ ...playersStats });
                                        }}
                                        variant="standard"
                                      ></TextField>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" align="center">
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
                  {matchPlayers.presentPlayers
                    .filter((player) => player.position === 'Goleiro')
                    .map((goalkeeper) => {
                      return (
                        <TableRow key={goalkeeper._id}>
                          <TableCell>{goalkeeper.nickname}</TableCell>
                          <TableCell>
                            <TextField
                              inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                step: 1,
                              }}
                              required
                              value={playersStats[goalkeeper._id].goals}
                              onChange={(event) => {
                                playersStats[goalkeeper._id].goals =
                                  parseInt(event.target.value) ?? 0;
                                serPlayerStats({ ...playersStats });
                              }}
                              variant="standard"
                            ></TextField>
                          </TableCell>
                          <TableCell>
                            <TextField
                              inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                step: 1,
                              }}
                              required
                              value={playersStats[goalkeeper._id].assists}
                              onChange={(event) => {
                                playersStats[goalkeeper._id].assists =
                                  parseInt(event.target.value) ?? 0;
                                serPlayerStats({ ...playersStats });
                              }}
                              variant="standard"
                            ></TextField>
                          </TableCell>
                          <TableCell>
                            <TextField
                              inputProps={{
                                inputMode: 'numeric',
                                step: 1,
                              }}
                              type="number"
                              required
                              value={playersStats[goalkeeper._id].yellowCards}
                              onChange={(event) => {
                                playersStats[goalkeeper._id].yellowCards =
                                  parseInt(event.target.value) ?? 0;
                                serPlayerStats({ ...playersStats });
                              }}
                              variant="standard"
                            ></TextField>
                          </TableCell>
                          <TableCell>
                            <TextField
                              inputProps={{
                                inputMode: 'numeric',
                                step: 1,
                              }}
                              type="number"
                              required
                              value={playersStats[goalkeeper._id].redCards}
                              onChange={(event) => {
                                playersStats[goalkeeper._id].redCards =
                                  parseInt(event.target.value) ?? 0;
                                serPlayerStats({ ...playersStats });
                              }}
                              variant="standard"
                            ></TextField>
                          </TableCell>
                          <TableCell>
                            <TextField
                              label="Time"
                              sx={{ width: 200 }}
                              onChange={handleGoalkeeperTeamChange(goalkeeper)}
                              select
                            >
                              <MenuItem value="teamA">Casa</MenuItem>
                              <MenuItem value="teamB">Visitante</MenuItem>
                            </TextField>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Partidas
            </Typography>
            <MarchesForm
              matches={matches}
              handleTeamGoalkeeperChange={handleTeamGoalkeeperChange}
              teamGoalkeeperMenuItems={teamGoalkeeperMenuItems}
              handleTeamChange={handleTeamChange}
              teamMenuItems={teamMenuItems}
              handleTeamGoalsChange={handleTeamGoalsChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Punições
            </Typography>
            <TeamPunishmentsForm
              teamPunishments={teamPunishments}
              teamMenuItems={teamMenuItems}
              setTeamPunishments={setTeamPunishments}
            />
          </Grid>
        </Grid>
        <Button type="submit">Salvar</Button>
      </FormControl>
    </form>
  );
}

function MarchesForm({
  matches,
  handleTeamGoalkeeperChange,
  teamGoalkeeperMenuItems,
  handleTeamChange,
  teamMenuItems,
  handleTeamGoalsChange,
}: {
  matches: SerieDetailsMatchData[];
  handleTeamGoalkeeperChange: (
    team: SerieDetailsMatchTeamData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  teamGoalkeeperMenuItems: () => JSX.Element[];
  handleTeamChange: (
    team: SerieDetailsMatchTeamData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  teamMenuItems: () => JSX.Element[];
  handleTeamGoalsChange: (
    team: SerieDetailsMatchTeamData
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Grid item xs={12}>
      <Stack spacing={1}>
        {matches.map((match, index) => {
          return (
            <Paper key={index} variant="outlined">
              <FormControl>
                <Grid
                  container
                  padding={1}
                  spacing={1}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography>Partida {index + 1}</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Goleiro"
                      sx={{ width: 200 }}
                      value={match.teamA.goalkeeper?._id || ''}
                      onChange={handleTeamGoalkeeperChange(match.teamA)}
                      select
                    >
                      <MenuItem value={''}>Convidado</MenuItem>
                      {teamGoalkeeperMenuItems()}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      label="Time"
                      sx={{ width: 200 }}
                      value={match.teamA.team}
                      onChange={handleTeamChange(match.teamA)}
                      select
                    >
                      {teamMenuItems()}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      value={match.teamA.goals}
                      onChange={handleTeamGoalsChange(match.teamA)}
                      sx={{ width: 50 }}
                      required
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" align="center">
                      X
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      value={match.teamB.goals}
                      onChange={handleTeamGoalsChange(match.teamB)}
                      sx={{ width: 50 }}
                      required
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Time"
                      required
                      sx={{ width: 200 }}
                      value={match.teamB.team}
                      onChange={handleTeamChange(match.teamB)}
                      select
                    >
                      {teamMenuItems()}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Goleiro"
                      sx={{ width: 200 }}
                      value={match.teamB.goalkeeper?._id || ''}
                      onChange={handleTeamGoalkeeperChange(match.teamB)}
                      select
                    >
                      <MenuItem value={''}>Convidado</MenuItem>
                      {teamGoalkeeperMenuItems()}
                    </TextField>
                  </Grid>
                </Grid>
              </FormControl>
            </Paper>
          );
        })}
      </Stack>
    </Grid>
  );
}

function TeamPunishmentsForm({
  teamPunishments,
  teamMenuItems,
  setTeamPunishments,
}: {
  teamPunishments: TeamPunishmentData[];
  teamMenuItems: () => JSX.Element[];
  setTeamPunishments: (punishments: TeamPunishmentData[]) => void;
}) {
  const handleTeamChange =
    (punishment: TeamPunishmentData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      punishment.team = event.target.value;
      setTeamPunishments([...teamPunishments]);
    };

  const handleAddPunishment = () => {
    setTeamPunishments([...teamPunishments, { team: '', points: 0, reason: '' }]);
  };

  const handleScoreChange =
    (punishment: TeamPunishmentData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      punishment.points = parseInt(event.target.value);
      setTeamPunishments([...teamPunishments]);
    };

  const handleReasonChange =
    (punishment: TeamPunishmentData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      punishment.reason = event.target.value;
      setTeamPunishments([...teamPunishments]);
    };

  const handleRemovePunishment = (index: number) => () => {
    teamPunishments.splice(index, 1);
    setTeamPunishments([...teamPunishments]);
  };

  return (
    <Stack spacing={1}>
      {teamPunishments?.map((punishment, index) => {
        return (
          <Paper key={index} variant="outlined">
            <Grid item key={index}>
              <FormControl>
                <Grid
                  container
                  padding={1}
                  spacing={1}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      required
                      label="Time"
                      sx={{ width: 200 }}
                      value={punishment.team}
                      onChange={handleTeamChange(punishment)}
                      select
                    >
                      {teamMenuItems()}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      inputProps={{
                        inputMode: 'numeric',
                        step: 1,
                      }}
                      type="number"
                      value={punishment.points}
                      onChange={handleScoreChange(punishment)}
                      sx={{ width: 100 }}
                      label="Pontos"
                      required
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      value={punishment.reason}
                      onChange={handleReasonChange(punishment)}
                      label="Motivo"
                      required
                      fullWidth
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <IconButton color="primary" onClick={handleRemovePunishment(index)}>
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
          </Paper>
        );
      })}
      <Button onClick={handleAddPunishment}>Adicionar</Button>
    </Stack>
  );
}
