import React from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/system'

import { SerieSummaryData } from '../../types/series'

const CustomizedTableCell = styled(TableCell)(() => ({
  border: 'none',
}))

export default function SerieSummaryComponent({ serie }: { serie: SerieSummaryData }) {
  return (
    <Card variant="outlined">
      <CardActionArea LinkComponent={Link} href={`/series/${serie._id}`}>
        <CardContent sx={{ display: 'flex', justifyContent: 'left' }}>
          <TableContainer sx={{ display: 'inline-flex' }}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <CustomizedTableCell align="left">
                    <b>Serie:</b>
                  </CustomizedTableCell>
                  <CustomizedTableCell align="left">
                    {serie.month}/{serie.year}
                  </CustomizedTableCell>
                </TableRow>
                <TableRow>
                  <CustomizedTableCell align="left">
                    <b>Campeão:</b>
                  </CustomizedTableCell>
                  <CustomizedTableCell align="left">
                    {serie.champion?.color ?? '?'}
                  </CustomizedTableCell>
                </TableRow>
                <TableRow>
                  <CustomizedTableCell align="left">
                    <b>Artilheiros:</b>
                  </CustomizedTableCell>
                  <CustomizedTableCell align="left">
                    {serie.topScorers?.map((p) => p.nickname).join(', ') ?? '?'}
                  </CustomizedTableCell>
                </TableRow>
                <TableRow>
                  <CustomizedTableCell align="left">
                    <b>Garçons:</b>
                  </CustomizedTableCell>
                  <CustomizedTableCell align="left">
                    {serie.topAssistants?.map((p) => p.nickname).join(', ') ?? '?'}
                  </CustomizedTableCell>
                </TableRow>
                <TableRow>
                  <CustomizedTableCell align="left">
                    <b>Indisciplinados:</b>
                  </CustomizedTableCell>
                  <CustomizedTableCell align="left">
                    {serie.topCards?.map((p) => p.nickname).join(', ') ?? '?'}
                  </CustomizedTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
