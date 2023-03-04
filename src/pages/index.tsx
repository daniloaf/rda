import _ from "lodash";
import { Collapse, Grid, IconButton, Paper, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { GetServerSideProps } from "next";
import GameDayPlayerStatsComponent from "../components/GameDayPlayerStatsComponent";
import TeamRankingTableComponent from "../components/TeamRankingTableComponent";
import * as GameDayServices from "../services/gameDay";
import DateComponent from "../components/DateComponent";
import MatchesListComponent from "../components/MatchesListComponent";
import { useState } from "react";
import { Stack } from "@mui/system";
import getMonthName from "../utils/getMonthName";
import useRequestMutation from "../utils/userRequestMutation";
import GameDaySummaryData from "../types/GameDaySummaryData";
import TeamRankingData from "../types/TeamRankingData";
import GameDayPlayerStats from "../types/GameDayPlayerStats";
import GameDayMatchData from "../types/GameDayMatchData";

const GameDayComponent = ({ gameDay }: { gameDay: GameDaySummaryData }) => {
  const [open, setOpen] = useState(false);
  const {
    trigger: fetchData,
    data,
    error,
  } = useRequestMutation<{
    teamRanking: Array<TeamRankingData>;
    gameDayPlayerStats: Array<GameDayPlayerStats>;
    gameDate: string;
    gameDayMatches: Array<GameDayMatchData>;
  }>({
    url: `/api/gameDays/${gameDay._id}`,
  });

  const handleOpen = async (open: boolean) => {
    if (open) {
      if (!data) await fetchData();
    }
    setOpen(open);
  };

  return (
    <>
      <Stack direction="row">
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={async () => await handleOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <Typography variant="h6">
          Racha <DateComponent dateString={gameDay.date} />
        </Typography>
      </Stack>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <br />
        {data && (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <GameDayPlayerStatsComponent
                title="Atletas"
                playersStats={data?.gameDayPlayerStats}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TeamRankingTableComponent
                title="Classificação"
                ranking={data?.teamRanking}
              />
              <br />
              <MatchesListComponent matches={data?.gameDayMatches} />
            </Grid>
          </Grid>
        )}
      </Collapse>
    </>
  );
};

export default function Home({
  previousGameDays,
}: {
  previousGameDays: Array<{
    _id: string;
    date: string;
    year: number;
    month: number;
  }>;
}) {
  _(previousGameDays)
    .entries()
    .orderBy((d) => d[0], "desc").map;
  return (
    <>
      <Stack padding={1} spacing={1}>
        {_(previousGameDays)
          .orderBy(["year", "month", "date"], ["desc", "desc", "desc"])
          .map((gameDay) => {
            return <GameDayComponent key={gameDay._id} gameDay={gameDay} />;
          })
          .value()}
      </Stack>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const previousGameDays = await GameDayServices.getPreviousGameDaysSummary();

  return {
    props: {
      previousGameDays,
    },
  };
};
