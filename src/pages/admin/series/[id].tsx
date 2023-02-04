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
import { Component, ReactElement, useState } from "react";
import GameDayFormComponent from "../../../components/GameDayFormComponent";

const AddContentDialog = ({
  title,
  open = false,
  handleClose,
  children,
}: {
  title: string;
  open: boolean;
  handleClose: () => void;
  children: ReactElement | null;
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleClose}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function AdminSerieDetailsPage({
  serie,
}: {
  serie: SerieDetailsData;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState<ReactElement | null>(null);

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogContent(null);
    setDialogTitle("");
  };

  const handleAddGameDayOnClick = () => {
    setDialogTitle("Adicionar Racha");
    setDialogContent(<GameDayFormComponent teams={serie.teams} />);
    setOpenDialog(true);
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
          <Button>Alterar Times</Button>
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
        title={dialogTitle}
        open={openDialog}
        handleClose={handleDialogClose}
      >
        {dialogContent}
      </AddContentDialog>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.query.id as string;
  const serie = await AdminServices.getSerieDetails(id);

  return {
    props: {
      serie: JSON.parse(JSON.stringify(serie)),
    },
  };
};
