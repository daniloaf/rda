import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import PlayerCard from "../components/PlayerCard";
import { useNavigate } from "react-router-dom";
import { getPlayers } from "../http/players";

const PlayersBoard = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    getPlayers().then(setPlayers);
  }, []);

  return (
    <Box width="50%" sx={{ display: "inline-flex" }} component={Paper}>
      <Grid container spacing={2} padding={1}>
        {players.map((player) => {
          return (
            <Grid item key={player._id} xs={3}>
              <PlayerCard
                data={player}
                onClick={() => navigate(`./${player._id}`)}
              ></PlayerCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PlayersBoard;
