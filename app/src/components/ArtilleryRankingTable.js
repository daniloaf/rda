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

const ArtilleryRankingTable = ({ month }) => {
  const ranking = [
    {
      player: "Gordão",
      team: "blue",
      goals: 4,
    },
    {
      player: "Vieira",
      team: "blue",
      goals: 3,
    },
    {
      player: "Zé",
      team: "blue",
      goals: 2,
    },
  ];

  return (
    <div>
      <Typography>Artilharia (Maio)</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Jogador</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Gols</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranking.map((r) => (
              <TableRow key={r.team}>
                <TableCell>{r.player}</TableCell>
                <TableCell>{teamName(r.team)}</TableCell>
                <TableCell>{r.goals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ArtilleryRankingTable;
