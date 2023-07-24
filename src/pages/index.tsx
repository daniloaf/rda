import _ from 'lodash';
import { Collapse, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GetServerSideProps } from 'next';
import GameDayPlayerStatsComponent from '../components/GameDayPlayerStatsComponent';
import TeamRankingTableComponent from '../components/TeamRankingTableComponent';
import * as GameDayServices from '../services/gameDay';
import DateComponent from '../components/DateComponent';
import MatchesListComponent from '../components/MatchesListComponent';
import { useState } from 'react';
import { Stack } from '@mui/system';
import getMonthName from '../utils/getMonthName';
import useRequestMutation from '../utils/userRequestMutation';
import GameDaySummaryData from '../types/GameDaySummaryData';
import TeamRankingData from '../types/TeamRankingData';
import GameDayPlayerStats from '../types/GameDayPlayerStats';
import GameDayMatchData from '../types/GameDayMatchData';

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
              <TeamRankingTableComponent title="Classificação" ranking={data?.teamRanking} />
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
  const groupedData = {} as any;

  _(previousGameDays)
    .orderBy(['year', 'month', 'date'], ['desc', 'desc', 'desc'])
    .forEach((gameDay) => {
      if (!groupedData[gameDay.year]) groupedData[gameDay.year] = {};
      if (!groupedData[gameDay.year][gameDay.month]) groupedData[gameDay.year][gameDay.month] = [];
      groupedData[gameDay.year][gameDay.month].push(gameDay);
    });

  return (
    <>
      <Stack padding={1} spacing={1}>
        {_.keys(groupedData)
          .sort()
          .reverse()
          .map((year) => {
            return (
              <Stack key={year} spacing={1} padding={1} component={Paper}>
                <Typography variant="h5">{year}</Typography>
                <Divider />
                {_.keys(groupedData[year])
                  .sort()
                  .reverse()
                  .map((month) => {
                    return (
                      <Stack key={month} spacing={1}>
                        <Typography variant="h6">
                          {getMonthName(parseInt(month), 'LLLL')}
                        </Typography>
                        {_(groupedData[year][month])
                          .orderBy(['year', 'month', 'date'], ['desc', 'desc', 'desc'])
                          .map((gameDay) => {
                            return <GameDayComponent key={gameDay._id} gameDay={gameDay} />;
                          })
                          .value()}
                      </Stack>
                    );
                  })}
              </Stack>
            );
          })}
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
