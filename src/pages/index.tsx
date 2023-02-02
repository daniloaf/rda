import { Collapse, Grid, IconButton, Paper, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { GetServerSideProps } from "next";
import GameDayPlayerStatsComponent from "../components/GameDayPlayerStatsComponent";
import TeamRankingTableComponent from "../components/TeamRankingTableComponent";
import GameDayPlayerStats from "../types/GameDayPlayerStats";
import TeamRankingData from "../types/TeamRankingData";
import * as GameDayServices from "../services/gameDay";
import DateComponent from "../components/DateComponent";
import MatchesListComponent from "../components/MatchesListComponent";
import GameDayMatchData from "../types/GameDayMatchData";
import { useState } from "react";

export default function Home({
  latestTeamRanking,
  latestGameDayPlayerStats,
  latestGameDate,
  latestGameDayMatches,
}: {
  latestTeamRanking: Array<TeamRankingData>;
  latestGameDayPlayerStats: Array<GameDayPlayerStats>;
  latestGameDate: string;
  latestGameDayMatches: Array<GameDayMatchData>;
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Grid container direction="row">
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <Typography variant="h5">
          Racha <DateComponent dateString={latestGameDate} />
        </Typography>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <br />
        <Grid container width="100%">
          <Grid item width="50%">
            <GameDayPlayerStatsComponent
              title="Atletas"
              playersStats={latestGameDayPlayerStats}
            />
          </Grid>
          <Grid item width="50%">
            <TeamRankingTableComponent
              title="Times"
              ranking={latestTeamRanking}
            />
            <br />
            <MatchesListComponent matches={latestGameDayMatches} />
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    latestTeamRanking,
    latestGameDayPlayerStats,
    latestGameDate,
    latestGameDayMatches,
  } = await GameDayServices.getLatestGameDayRankings();

  return {
    props: {
      latestTeamRanking,
      latestGameDayPlayerStats,
      latestGameDate,
      latestGameDayMatches,
    },
  };
};
