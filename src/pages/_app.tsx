import * as React from "react";
import useSWR from "swr";
import Head from "next/head";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../config/theme";
import ApplicationBarComponent from "../components/ApplicationBarComponent";
import SideBarComponent from "../components/SideBarComponent";
import createEmotionCache from "../config/createEmotionCache";
import axios, { AxiosError } from "axios";
import TeamRankingData from "../types/TeamRankingData";
import GameDayPlayerStats from "../types/GameDayPlayerStats";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("api/sidebarData", fetcher) as {
    data: {
      currentTeamRanking: Array<TeamRankingData>;
      currentGameDayPlayerStats: Array<GameDayPlayerStats>;
    };
    error: AxiosError;
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Racha dos Amigles</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ApplicationBarComponent />
        <br />
        <div
          style={{
            width: "19%",
            position: "fixed",
            float: "right",
            right: 5,
            margin: 1,
            padding: 1,
          }}
        >
          <SideBarComponent currentTeamRanking={data.currentTeamRanking} />
        </div>
        <div
          style={{
            width: "79%",
            padding: 1,
            position: "fixed",
            float: "left",
            left: 5,
          }}
        ></div>
        <div style={{ width: "80%" }}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
