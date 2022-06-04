import React from "react";
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
import { DateTime, Info } from "luxon";

const getMonthName = (monthNumber) => {
  return Info.months("long", { locale: DateTime.local().locale })[monthNumber];
};

const YearRow = (props) => {
  const { stat } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell>{stat.year}</TableCell>
        <TableCell>{stat.attendance}</TableCell>
        <TableCell>{stat.goals}</TableCell>
        <TableCell>{stat.assists}</TableCell>
        <TableCell>{stat.wins}</TableCell>
        <TableCell>{stat.draws}</TableCell>
        <TableCell>{stat.losses}</TableCell>
      </TableRow>
      <MonthRows open={open} />
    </React.Fragment>
  );
};

const MonthCell = ({ open, children }) => {
  return (
    <TableCell
      style={{ paddingBottom: 0, paddingTop: 0, border: "none" }}
      colSpan={1}
    >
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </TableCell>
  );
};

const MonthRows = ({ monthStats, open }) => {
  monthStats = monthStats || [
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
  return monthStats.map((stat) => {
    return (
      <TableRow style={{ border: "none" }}>
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

const PlayerYearStats = ({ stats }) => {
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
          <TableCell />
          <TableCell>Ano</TableCell>
          <TableCell>Presenças</TableCell>
          <TableCell>Gols</TableCell>
          <TableCell>Assistências</TableCell>
          <TableCell>Vitórias</TableCell>
          <TableCell>Empates</TableCell>
          <TableCell>Derrotas</TableCell>
        </TableHead>
        <TableBody>
          {stats.map((stat) => {
            return <YearRow stat={stat} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerYearStats;
