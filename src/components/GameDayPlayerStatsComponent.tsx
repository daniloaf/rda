import { styled } from "@mui/system";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import GameDayPlayerStats from "../types/GameDayPlayerStats";
import { Paper, Typography } from "@mui/material";

const CustomizedTableCell = styled(TableCell)(() => ({
  border: "none",
}));

export default function GameDayPlayerStatsComponent({
  title,
  playersStats,
}: {
  title: string;
  playersStats: Array<GameDayPlayerStats>;
}) {
  return (
    <Paper sx={{ padding: 1 }}>
      <Typography>{title}</Typography>
      <TableContainer sx={{ display: "inline-flex", marginTop: "10px" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Atleta</TableCell>
              <TableCell>Gols</TableCell>
              <TableCell>Assistências</TableCell>
              <TableCell>Nota</TableCell>
              <TableCell>Vitórias</TableCell>
              <TableCell>Empates</TableCell>
              <TableCell>Derrotas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playersStats.map((playerStats) => {
              return (
                <TableRow key={playerStats.playerId}>
                  <TableCell align="left">
                    {playerStats.nickname}
                  </TableCell>
                  <TableCell align="left">
                    {playerStats.goals}
                  </TableCell>
                  <TableCell align="left">
                    {playerStats.assists}
                  </TableCell>
                  <TableCell align="left">
                    {playerStats.score}
                  </TableCell>
                  <TableCell align="left">
                    {playerStats.victories}
                  </TableCell>
                  <TableCell align="left">
                    {playerStats.draws}
                  </TableCell>
                  <TableCell align="left">
                    {playerStats.losses}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
