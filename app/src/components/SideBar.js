import { Divider, Paper } from "@mui/material";
import ArtilleryRankingTable from "./ArtilleryRankingTable";
import MonthRankingTable from "./MonthRankingTable";

const SideBar = () => {
  return (
    <Paper
      sx={{
        width: "19%",
        position: "fixed",
        float: "right",
        right: 0
      }}
      variant="outlined"
    >
      <MonthRankingTable />
      <Divider sx={{ marginTop: 1, marginBottom: 1 }}/>
      <ArtilleryRankingTable />
    </Paper>
  );
};

export default SideBar;
