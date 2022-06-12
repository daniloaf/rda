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
    <Box sx={{ display: "inline-flex", position: "fixed", left: 0, width: "80%" }}>
      <Grid container spacing={1} padding={5}>
        {players.map((player) => {
          return (
            <Grid item key={player._id} xs={6} sm={4} md={3} lg={3} xl={2}>
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
