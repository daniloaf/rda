import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import DateComponent from "../../../components/DateComponent";
import * as AdminServices from "../../../services/admin";
import getMonthName from "../../../utils/getMonthName";
import SerieDetailsData from "../../../types/admin/SerieDetailsData";
import { ReactElement, useState } from "react";
import GameDayFormComponent from "../../../components/GameDayFormComponent";
import ManageTeamsComponent from "../../../components/ManageTeamsComponent";
import ActivePlayerData from "../../../types/admin/ActivePlayerData";
import axios from "axios";

const AddContentDialog = ({
  title,
  open = false,
  handleClose,
  handleSave,
  children,
}: {
  title: string;
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
  children: ReactElement | null;
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function AdminSerieDetailsPage({
  serie,
  activePlayers,
}: {
  serie: SerieDetailsData;
  activePlayers: Array<ActivePlayerData>;
}) {
  const [manageGameDayDialogOpen, setManageGameDayOpen] = useState(false);
  const [manageTeamsDialogOpen, setManageTeamsOpen] = useState(false);
  const [teams, setTeams] = useState(
    {} as { [index: string]: Array<{ _id: string }> }
  );

  const handleManageDameDayDialogClose = () => {
    setManageGameDayOpen(false);
  };

  const handleManageTeamsDialogClose = () => {
    setManageTeamsOpen(false);
  };

  const handleAddGameDayOnClick = () => {
    setManageGameDayOpen(true);
  };

  const handleManageTeamsSave = async () => {
    const teamsData = Object.entries(teams).map(([key, value]) => {
      return {
        color: key,
        players: value.map((p) => p._id),
      };
    });

    const response = await axios.put(
      `/api/admin/series/${serie._id}/teams`,
      teamsData
    );
    handleManageTeamsDialogClose();
  };

  const handleManageTeamsOnClick = () => {
    setManageTeamsOpen(true);
  };

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h5">
          Série {getMonthName(serie.month, "LLLL")}/{serie.year}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography variant="body1">
            <b>Início: </b>
            <DateComponent dateString={serie.startDate} />
          </Typography>
          <Typography>
            <b>Fim: </b>
            <DateComponent dateString={serie.endDate} />
          </Typography>
        </Stack>
        <br />
        <Stack component={Paper} spacing={1} padding={1}>
          <Typography variant="h5" align="center">
            Times da série
          </Typography>
          <Grid container spacing={2} padding={1} justifyContent="center">
            {serie.teams.map((team) => {
              return (
                <Grid key={team._id} item xs={3}>
                  <Paper sx={{ padding: 1 }}>
                    <Typography variant="subtitle2">
                      Time {team.color}
                    </Typography>
                    {team.players.map((player) => (
                      <Typography variant="body1" key={player._id}>
                        {player.nickname}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
          <Button onClick={handleManageTeamsOnClick}>Alterar Times</Button>
        </Stack>
        <Stack component={Paper} spacing={1} padding={1}>
          <Typography variant="h5" align="center">
            Rachas
          </Typography>
          {serie.gameDays.map((gameDay) => {
            return (
              <Paper key={gameDay.date}>
                <Typography>
                  <DateComponent dateString={gameDay.date} />
                </Typography>
              </Paper>
            );
          })}
          <Button onClick={handleAddGameDayOnClick}>Adicionar Racha</Button>
        </Stack>
      </Stack>
      <AddContentDialog
        title="Alterar times"
        open={manageTeamsDialogOpen}
        handleClose={handleManageTeamsDialogClose}
        handleSave={handleManageTeamsSave}
      >
        <ManageTeamsComponent
          players={activePlayers}
          handleDataChange={setTeams}
        />
      </AddContentDialog>
      <AddContentDialog
        title="Adicionar Racha"
        open={manageGameDayDialogOpen}
        handleClose={handleManageDameDayDialogClose}
        handleSave={handleManageDameDayDialogClose}
      >
        <GameDayFormComponent teams={serie.teams} />
      </AddContentDialog>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.query.id as string;
  const serie = await AdminServices.getSerieDetails(id);
  const activePlayers = await AdminServices.getActivePlayers();

  return {
    props: {
      serie: JSON.parse(JSON.stringify(serie)),
      activePlayers: JSON.parse(JSON.stringify(activePlayers)),
    },
  };
};
