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
  href,
}: {
  player: PlayerCardData;
  width?: number;
  height?: number;
  linkEndabled?: boolean;
  href: string;
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: width,
        width: width,
        borderColor: player.active ? "green" : "red",
      }}
    >
      <CardActionArea
        disabled={!linkEndabled}
        LinkComponent={Link}
        href={href}
      >
        <CardMedia
          component="img"
          alt="Jogador"
          image={player.picture}
          width={width}
        />
        <CardContent
          sx={{ height: 5, display: "flex", justifyContent: "center" }}
        >
          <Typography align="center" variant="caption">
            {player.nickname}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
