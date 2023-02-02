import { Paper } from "@mui/material";
import GameDayPlayerStats from "../types/GameDayPlayerStats";
import TeamRankingData from "../types/TeamRankingData";
import ArtilleryRankingComponent from "./ArtilleryRankingComponent";
import GameDayPlayerStatsComponent from "./GameDayPlayerStatsComponent";
import TeamRankingTableComponent from "./TeamRankingTableComponent";

export default function SideBarComponent({
  currentTeamRanking,
  currentPlayersStats,
}: {
  currentTeamRanking: Array<TeamRankingData>;
  currentPlayersStats: Array<GameDayPlayerStats>;
}) {
  return (
    <Paper variant="outlined" sx={{ padding: 1 }}>
      <TeamRankingTableComponent
        title="Classificação Atual"
        ranking={currentTeamRanking}
      />
      <br />
      <GameDayPlayerStatsComponent
        title={"Atletas"}
        playersStats={currentPlayersStats}
        abbreviate={true}
        limit={5}
      />
    </Paper>
  );
}
