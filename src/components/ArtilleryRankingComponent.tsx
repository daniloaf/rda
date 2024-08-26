import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
// import { Paper } from "@mui/material";

const teamName = (color: string) => {
  let team;
  switch (color) {
    case 'blue':
      team = 'Azul';
      break;
    case 'orange':
      team = 'Laranja';
      break;
    case 'white':
      team = 'Branco';
      break;
    default:
      team = 'Sem cor';
      break;
  }
  return team;
};

export default function ArtilleryRankingComponent({ month }: { month?: number }) {
  const ranking = [
    {
      player: 'Gordão',
      team: 'Azul',
      goals: 4,
    },
    {
      player: 'Vieira',
      team: 'Laranja',
      goals: 3,
    },
    {
      player: 'Zé',
      team: 'Branco',
      goals: 2,
    },
  ];

  return (
    <Paper sx={{ padding: 1 }}>
      <Typography>Artilharia</Typography>
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
              <TableRow key={r.player}>
                <TableCell>{r.player}</TableCell>
                <TableCell>{r.team}</TableCell>
                <TableCell>{r.goals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
