import React, { ReactNode } from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import PlayerYearStats from '../types/PlayerYearStats';
import PlayerMonthStatsData from '../types/PlayerMonthStatsData';
import StyleTwoToneIcon from '@mui/icons-material/StyleTwoTone';
import useRequest from '../utils/useRequest';
import { useRouter } from 'next/router';
import getMonthName from '../utils/getMonthName';

const YearRow = ({ stats }: { stats: PlayerYearStats }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ borderBottom: 'unset' }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{stats.year}</TableCell>
        <TableCell>{stats.attendance}</TableCell>
        <TableCell>{stats.goals}</TableCell>
        <TableCell>{stats.assists}</TableCell>
        <TableCell>{stats.yellowCards}</TableCell>
        <TableCell>{stats.redCards}</TableCell>
        <TableCell>{stats.wins}</TableCell>
        <TableCell>{stats.draws}</TableCell>
        <TableCell>{stats.losses}</TableCell>
      </TableRow>
      <MonthRows open={open} year={stats.year} />
    </>
  );
};

const MonthCell = ({ open, children }: { open: boolean; children?: ReactNode }) => {
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 5, border: 'none' }} colSpan={1}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </TableCell>
  );
};

const MonthRows = ({ year, open }: { year: number; open: boolean }) => {
  const router = useRouter();

  const { id: playerId } = router.query;

  const { data, error } = useRequest({
    url: `/api/players/${playerId}/stats/${year}`,
  });

  if (open) {
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;
  }

  const monthStats = data as Array<PlayerMonthStatsData>;

  return (
    <>
      {open &&
        monthStats &&
        monthStats.map((stat) => {
          return (
            <TableRow key={`${stat.month}/${stat.year}`}>
              <MonthCell open={open} />
              <MonthCell open={open}>{getMonthName(stat.month)}</MonthCell>
              <MonthCell open={open}>{stat.attendance}</MonthCell>
              <MonthCell open={open}>{stat.goals}</MonthCell>
              <MonthCell open={open}>{stat.assists}</MonthCell>
              <MonthCell open={open}>{stat.yellowCards}</MonthCell>
              <MonthCell open={open}>{stat.redCards}</MonthCell>
              <MonthCell open={open}>{stat.wins}</MonthCell>
              <MonthCell open={open}>{stat.draws}</MonthCell>
              <MonthCell open={open}>{stat.losses}</MonthCell>
            </TableRow>
          );
        })}
    </>
  );
};

export default function PlayerYearStatsComponent({ stats }: { stats: Array<PlayerYearStats> }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Ano</TableCell>
            <TableCell>Presenças</TableCell>
            <TableCell>Gols</TableCell>
            <TableCell>Assistências</TableCell>
            <TableCell>
              <StyleTwoToneIcon style={{ fill: '#f5d742' }} />
            </TableCell>
            <TableCell>
              <StyleTwoToneIcon style={{ fill: '#fc1919' }} />
            </TableCell>
            <TableCell>Vitórias</TableCell>
            <TableCell>Empates</TableCell>
            <TableCell>Derrotas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stats) => {
            return <YearRow key={`year-${stats.year}`} stats={stats} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
