import GameDayPlayerStats from "../types/GameDayPlayerStats";
import EnhancedTableComponent from "./utils/EnchancedTableComponent";
import StyleTwoToneIcon from "@mui/icons-material/StyleTwoTone";
import StarIcon from '@mui/icons-material/Star';
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
          { field: "assists", label: abbreviate ? "A" : "Assitências" },
          { field: "yellowCards", label: <StyleTwoToneIcon style={{ fill: "#f5d742" }} /> },
          { field: "redCards", label: <StyleTwoToneIcon style={{ fill: "#fc1919" }} /> },
          { field: "teamColor", label: abbreviate ? "T" : "Time" },
        ]}
        data={playersStats}
        limit={limit}
        defaultOrderBy="goals"
        defaultOrder="desc"
      />
    </Paper>
  );
}
