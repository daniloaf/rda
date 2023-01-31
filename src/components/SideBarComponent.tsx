import { Divider, Paper } from "@mui/material";
import TeamRankingData from "../types/TeamRankingData";
import ArtilleryRankingComponent from "./ArtilleryRankingComponent";
import TeamRankingTableComponent from "./TeamRankingTableComponent";

export default function SideBarComponent({
  currentTeamRanking,
}: {
  currentTeamRanking: Array<TeamRankingData>;
}) {
  return (
    <Paper variant="outlined">
      <TeamRankingTableComponent
        title="Classificação (Maio)"
        ranking={currentTeamRanking}
      />
      <Divider />
      <ArtilleryRankingComponent />
    </Paper>
  );
}
