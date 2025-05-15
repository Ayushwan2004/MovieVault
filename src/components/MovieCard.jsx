import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';

function MovieCard({ poster_path, name, HandleAddToWatchList, movieObj, HandleRemoveFromWatchList, watchList }) {
  const isInWatchlist = watchList.some(movie => movie.id === movieObj.id);

  return (
    <Card sx={{ width: 200, position: 'relative' }}>
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={name}
      />
      <IconButton
        onClick={() => isInWatchlist ? HandleRemoveFromWatchList(movieObj) : HandleAddToWatchList(movieObj)}
        sx={{ position: 'absolute', top: 8, right: 8, color: 'white', backgroundColor: 'rgba(0,0,0,0.6)' }}
      >
        {isInWatchlist ? <ClearIcon /> : <FavoriteIcon />}
      </IconButton>
      <CardContent>
        <Typography variant="subtitle1" align="center">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;

