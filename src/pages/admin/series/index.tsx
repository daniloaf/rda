import { Button, Card, CardActionArea, Grid, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import AddSerieFormComponent from '../../../components/AddSerieFormComponent'
import DateComponent from '../../../components/DateComponent'
import * as AdminServices from '../../../services/admin'
import SerieSummaryByYearData from '../../../types/admin/SerieSummaryByYearData'
import getMonthName from '../../../utils/getMonthName'

export default function AdminSeriesPage({ seriesByYear }: { seriesByYear: SerieSummaryByYearData }) {
  const [addSerieOpen, setAddSerieOpen] = useState(false)

  return (
    <>
      <Stack spacing={1}>
        <Paper>
          <Button fullWidth onClick={() => setAddSerieOpen(true)}>
            Adicionar Série
          </Button>
        </Paper>
        {Object.keys(seriesByYear)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((year) => {
            const series = seriesByYear[year]
            return (
              <Stack key={year} spacing={1}>
                <Typography>{year}</Typography>
                {series.map((serie) => {
                  return (
                    <Card key={serie._id}>
                      <CardActionArea LinkComponent={Link} href={`/admin/series/${serie._id}`}>
                        <Grid
                          container
                          component={Paper}
                          padding={1}
                          sx={{
                            backgroundColor: serie.endDate ? '#167fae' : '#7fae16',
                          }}
                        >
                          <Grid item xs={12}>
                            <Typography>
                              {getMonthName(serie.month, 'LLLL')}/{serie.year}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>
                              Início: <DateComponent dateString={serie.startDate} />
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
                  )
                })}
              </Stack>
            )
          })}
      </Stack>
      <AddSerieFormComponent open={addSerieOpen} handleClose={() => setAddSerieOpen(false)} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const seriesByYear = await AdminServices.getSeriesSummaryByYear()

  return {
    props: {
      seriesByYear: JSON.parse(JSON.stringify(seriesByYear)),
    },
  }
}
