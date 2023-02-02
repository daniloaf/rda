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
  abbreviate = false,
  limit,
}: {
  title: string;
  playersStats: Array<GameDayPlayerStats>;
  abbreviate?: boolean;
  limit?: number;
}) {
  return (
    <Paper sx={{ padding: 1 }} elevation={2}>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <TableContainer sx={{ display: "inline-flex", marginTop: "10px" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{abbreviate ? "A" : "Atleta"}</TableCell>
              <TableCell>{abbreviate ? "G" : "Gols"}</TableCell>
              <TableCell>{abbreviate ? "A" : "Assitências"}</TableCell>
              <TableCell>{abbreviate ? "N" : "Notas"}</TableCell>
              <TableCell>{abbreviate ? "T" : "Time"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playersStats
              .slice(0, limit || playersStats.length)
              .map((playerStats) => {
                return (
                  <TableRow key={playerStats.playerId}>
                    <TableCell align="left">{playerStats.nickname}</TableCell>
                    <TableCell align="left">{playerStats.goals}</TableCell>
                    <TableCell align="left">{playerStats.assists}</TableCell>
                    <TableCell align="left">{playerStats.score}</TableCell>
                    <TableCell align="left">{playerStats.teamColor}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
