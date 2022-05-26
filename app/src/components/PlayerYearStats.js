import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "year", headerName: "Ano" },
  { field: "goals", headerName: "Gols" },
  { field: "assists", headerName: "Assistências" },
  { field: "attendance", headerName: "Presentas" },
  { field: "wins", headerName: "Vitórias" },
  { field: "draws", headerName: "Empates" },
  { field: "losses", headerName: "Derrotas" },
];

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
    <Box sx={{ display: "inline-flex", height: "100%" }}>
      <DataGrid hideFooter={true} columns={columns} rows={stats} />
    </Box>
  );
};

export default PlayerYearStats;
