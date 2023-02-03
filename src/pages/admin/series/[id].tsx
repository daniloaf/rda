import { Card, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import DateComponent from "../../../components/DateComponent";
import Player from "../../../models/player";
import * as AdminServices from "../../../services/admin";
import getMonthName from "../../../utils/getMonthName";
import { SerieDetailsData } from "./types";

export default function AdminSerieDetailsPage({ serie }: { serie: SerieDetailsData }) {
  return (
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
      <Typography variant="h5" align="center">Times da série</Typography>
      <Grid container spacing={2} justifyContent="center">
        {serie.teams.map((team) => {
          return (
            <Grid key={team._id} item xs={3}>
              <Paper>
                <Typography variant="subtitle2">Time {team.color}</Typography>
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
    </Stack>
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
