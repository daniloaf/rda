import { styled } from "@mui/system";
import TableCell from "@mui/material/TableCell";
import GameDayPlayerStats from "../types/GameDayPlayerStats";
import EnhancedTableComponent from "./utils/EnchancedTableComponent";
import { Paper, Typography } from "@mui/material";

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
      <EnhancedTableComponent
        columns={[
          { field: "nickname", label: abbreviate ? "A" : "Atleta" },
          { field: "goals", label: abbreviate ? "G" : "Gols" },
          { field: "assists", label: abbreviate ? "N" : "Assitências" },
          { field: "score", label: abbreviate ? "S" : "Nota" },
          { field: "teamColor", label: abbreviate ? "T" : "Time" },
        ]}
        data={playersStats}
        limit={limit}
      />
    </Paper>
  );
}
