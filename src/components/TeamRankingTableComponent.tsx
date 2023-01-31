import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import TeamRankingData from "../types/TeamRankingData";

const teamName = (color: string) => {
  let team;
  switch (color) {
    case "blue":
      team = "Azul";
      break;
    case "orange":
      team = "Laranja";
      break;
    case "white":
      team = "Branco";
      break;
    default:
      team = "Sem cor";
      break;
  }
  return team;
};

export default function TeamRankingTableComponent({
  title,
  ranking,
}: {
  title: string;
  ranking: Array<TeamRankingData>;
}) {
  return (
    <Paper sx={{ padding: 1 }}>
      <Typography>{title}</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Time</TableCell>
              <TableCell>P</TableCell>
              <TableCell>V</TableCell>
              <TableCell>E</TableCell>
              <TableCell>D</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranking.map((r) => (
              <TableRow key={r.color}>
                <TableCell>{r.color}</TableCell>
                <TableCell>{r.score}</TableCell>
                <TableCell>{r.victories}</TableCell>
                <TableCell>{r.draws}</TableCell>
                <TableCell>{r.losses}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
