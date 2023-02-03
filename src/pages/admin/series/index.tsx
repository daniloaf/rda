import { Card, CardActionArea, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { GetServerSideProps } from "next";
import Link from "next/link";
import DateComponent from "../../../components/DateComponent";
import * as AdminServices from "../../../services/admin";
import SerieSummaryByYearData from "../../../types/SerieSummaryByYearData";
import getMonthName from "../../../utils/getMonthName";

export default function AdminSeriesPage({
  seriesByYear,
}: {
  seriesByYear: SerieSummaryByYearData;
}) {
  return (
    <>
      {Object.keys(seriesByYear)
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map((year) => {
          const series = seriesByYear[year];
          return (
            <Stack key={year} spacing={1}>
              <Typography>{year}</Typography>
              {series.map((serie) => {
                return (
                  <Card key={serie._id}>
                    <CardActionArea
                      LinkComponent={Link}
                      href={`/admin/series/${serie._id}`}
                    >
                      <Grid container component={Paper} padding={1}>
                        <Grid item xs={12}>
                          <Typography>
                            {getMonthName(serie.month, "LLLL")}/{serie.year}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            Início:{" "}
                            <DateComponent dateString={serie.startDate} />
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            Fim: <DateComponent dateString={serie.endDate} />
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardActionArea>
                  </Card>
                );
              })}
            </Stack>
          );
        })}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const seriesByYear = await AdminServices.getSeriesSummaryByYear();

  return {
    props: {
      seriesByYear: JSON.parse(JSON.stringify(seriesByYear)),
    },
  };
};
