import _ from 'lodash';
import { Divider, Paper, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import * as GameDayServices from '../services/gameDay';
import { Stack } from '@mui/system';
import getMonthName from '../utils/getMonthName';
import GameDayComponent from '../components/GameDayComponent';

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
