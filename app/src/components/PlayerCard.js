import React from "react";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


const PlayerCard = ({ data, width, height }) => {
  return <Stack direction="column" spacing={0} sx={{ display: 'inline-flex' }} padding={1}>
    <img alt="Jogador" src={data.image} width={width} height={height} />
    <Typography variant="h4">{data.givenName}</Typography>
  </Stack>
};

export default PlayerCard;
