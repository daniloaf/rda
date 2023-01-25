import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

const PlayerCard = ({ data, width = 150, height = 200, onClick }) => {
  return (
    <Card variant="outlined" sx={{ minWidth: width, width: width, padding: 1 }}>
      <CardActionArea disabled={!onClick} onClick={onClick} >
        <CardMedia
          component="img"
          alt="Jogador"
          src={data.picture}
          width={width}
          height={height}
        />
        <CardContent sx={{ height: 10 }}>
          <Typography variant="h5">{data.nickname}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlayerCard;
