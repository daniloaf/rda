import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, Grid, Paper } from '@mui/material';
import theme from '../config/theme';
import ApplicationBarComponent from '../components/ApplicationBarComponent';
import SideBarComponent from '../components/SideBarComponent';
import createEmotionCache from '../config/createEmotionCache';
import useRequest from '../utils/useRequest';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { data, error } = useRequest({ url: '/api/sidebarData' });

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Racha dos Amigles</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApplicationBarComponent />
        <Grid container width="100%" padding={1} spacing={1}>
          <Grid item xs={12} sm={9}>
            <Paper sx={{ padding: 1 }} variant="outlined">
              <Component {...pageProps} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <SideBarComponent
              currentTeamRanking={data.currentTeamRanking}
              currentPlayersStats={data.currentPlayersStats}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
}
