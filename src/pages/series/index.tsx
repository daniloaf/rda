import { Grid } from '@mui/material'
import { GetServerSideProps } from 'next'
import SerieSummaryComponent from '../../components/series/SerieSummaryComponent'

import * as SerieServices from '../../services/serie'
import { SerieSummaryData } from '../../types/series'

export default function SeriesPage({ seriesSummaries }: { seriesSummaries: SerieSummaryData[] }) {
  return (
    <Grid container padding={1} spacing={1}>
      {seriesSummaries.map((serie) => {
        return (
          <Grid item key={serie._id} xs={12} sm={12} md={6} lg={4} xl={3}>
            <SerieSummaryComponent serie={serie} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const seriesSummaries = await SerieServices.getSeriesSummaries()

  return {
    props: {
      seriesSummaries: JSON.parse(JSON.stringify(seriesSummaries)),
    },
  }
}
