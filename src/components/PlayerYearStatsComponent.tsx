import React, { ReactNode } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
// import { DateTime, Info } from "luxon";
import PlayerYearStats from "../types/PlayerYearStats";
import PlayerMonthStatsData from "../types/PlayerMonthStatsData";

const getMonthName = (monthNumber: number) => {
  return String(monthNumber);
  // return Info.months("long", { locale: DateTime.local().locale })[monthNumber];
};

const YearRow = ({ stats }: { stats: PlayerYearStats }) => {
  const [open, setOpen] = React.useState(false);
  const monthStats = [
    {
      month: 2,
      goals: 1,
      assists: 1,
      attendance: 3,
      wins: 2,
      draws: 1,
      losses: 1,
    },
    {
      month: 3,
      goals: 1,
      assists: 1,
      attendance: 3,
      wins: 2,
      draws: 1,
      losses: 1,
    },
    {
      month: 4,
      goals: 1,
      assists: 1,
      attendance: 3,
      wins: 2,
      draws: 1,
      losses: 1,
    },
    {
      month: 8,
      goals: 1,
      assists: 1,
      attendance: 3,
      wins: 2,
      draws: 1,
      losses: 1,
    },
  ];

  return (
    <React.Fragment>
      <TableRow sx={{ borderBottom: "unset" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{stats.year}</TableCell>
        <TableCell>{stats.attendance}</TableCell>
        <TableCell>{stats.goals}</TableCell>
        <TableCell>{stats.assists}</TableCell>
        <TableCell>{stats.wins}</TableCell>
        <TableCell>{stats.draws}</TableCell>
        <TableCell>{stats.losses}</TableCell>
      </TableRow>
      {/* <MonthRows open={open} monthStats={monthStats} /> */}
    </React.Fragment>
  );
};

const MonthCell = ({
  open,
  children,
}: {
  open: boolean;
  children?: ReactNode;
}) => {
  return (
    <TableCell
      style={{ paddingBottom: 0, paddingTop: 5, border: "none" }}
      colSpan={1}
    >
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </TableCell>
  );
};

const MonthRows = ({
  monthStats,
  open,
}: {
  monthStats: Array<PlayerMonthStatsData>;
  open: boolean;
}) => {
  return monthStats.map((stat) => {
    return (
      <TableRow key={stat.month}>
        <MonthCell open={open} />
        <MonthCell open={open}>{getMonthName(stat.month)}</MonthCell>
        <MonthCell open={open}>{stat.attendance}</MonthCell>
        <MonthCell open={open}>{stat.goals}</MonthCell>
        <MonthCell open={open}>{stat.assists}</MonthCell>
        <MonthCell open={open}>{stat.wins}</MonthCell>
        <MonthCell open={open}>{stat.draws}</MonthCell>
        <MonthCell open={open}>{stat.losses}</MonthCell>
      </TableRow>
    );
  });
};

export default function PlayerYearStatsComponent({
  stats,
}: {
  stats: Array<PlayerYearStats>;
}) {
  stats = stats || [
    {
      id: 1,
      year: 2022,
      goals: 5,
      assists: 3,
      attendance: 12,
      wins: 6,
      draws: 4,
      losses: 2,
    },
    {
      id: 2,
      year: 2021,
      goals: 5,
      assists: 3,
      attendance: 12,
      wins: 6,
      draws: 4,
      losses: 2,
    },
    {
      id: 3,
      year: 2020,
      goals: 5,
      assists: 3,
      attendance: 12,
      wins: 6,
      draws: 4,
      losses: 2,
    },
  ];
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
