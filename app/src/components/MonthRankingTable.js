import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

const teamName = (color) => {
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

const MonthRankingTable = ({ month }) => {
  const ranking = [
    {
      team: "blue",
      score: 9,
      victories: 3,
      draws: 0,
      losses: 0,
    },
    {
      team: "orange",
      score: 4,
      victories: 1,
      draws: 1,
      losses: 2,
    },
    {
      team: "white",
      score: 1,
      victories: 0,
      draws: 1,
      losses: 3,
    },
  ];

  return (
    <div>
      <Typography>Classificação (Maio)</Typography>
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
              <TableRow key={r.team}>
                <TableCell>{teamName(r.team)}</TableCell>
                <TableCell>{r.score}</TableCell>
                <TableCell>{r.victories}</TableCell>
                <TableCell>{r.draws}</TableCell>
                <TableCell>{r.losses}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MonthRankingTable;
