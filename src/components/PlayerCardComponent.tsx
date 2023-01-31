import React from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { PlayerCardData } from "../types/PlayerCardData";
import Image from "next/image";

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
    <Card variant="outlined" sx={{ minWidth: width, width: width, padding: 1 }}>
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
          height={height}
        />
        <CardContent sx={{ height: 10 }}>
          <Typography variant="h5">{player.nickname}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
