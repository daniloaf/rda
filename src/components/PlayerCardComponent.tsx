import React from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { PlayerCardData } from "../types/PlayerCardData";

export default function PlayerCardComponent({
  player,
  width = 150,
  height = 200,
  linkEndabled = false,
}: {
  player: PlayerCardData;
  width?: number;
  height?: number;
  linkEndabled?: boolean;
}) {
  return (
    <Card variant="outlined" sx={{ minWidth: width, width: width}}>
      <CardActionArea
        disabled={!linkEndabled}
        LinkComponent={Link}
        href={`/players/${player._id}`}
      >
        <CardMedia
          component="img"
          alt="Jogador"
          image={player.picture}
          width={width}
        />
        <CardContent sx={{ height: 5, display: "flex", justifyContent: "center" }}>
          <Typography align="center" variant="caption">{player.nickname}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
