import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Watchlist({ watchList, HandleRemoveFromWatchList }) {
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [ratingOrder, setRatingOrder] = useState(null); 
  const [popularityOrder, setPopularityOrder] = useState(null);

  useEffect(() => {
    const genreSet = new Set();
    watchList.forEach(movie => {
      movie.genre_ids?.forEach(id => genreSet.add(id));
    });
    const genreArray = Array.from(genreSet);
    setGenres(genreArray);
  }, [watchList]);

  const genreIdToName = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };

  let filteredMovies = watchList;

  if (selectedGenre !== 'All Genres') {
    filteredMovies = filteredMovies.filter(movie => movie.genre_ids?.includes(selectedGenre));
  }

  if (search.trim()) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.original_title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (ratingOrder === 'asc') {
    filteredMovies = [...filteredMovies].sort((a, b) => a.vote_average - b.vote_average);
  } else if (ratingOrder === 'desc') {
    filteredMovies = [...filteredMovies].sort((a, b) => b.vote_average - a.vote_average);
  }

  if (popularityOrder === 'asc') {
    filteredMovies = [...filteredMovies].sort((a, b) => a.popularity - b.popularity);
  } else if (popularityOrder === 'desc') {
    filteredMovies = [...filteredMovies].sort((a, b) => b.popularity - a.popularity);
  }

  return (
    <Box p={4}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Your Watchlist
      </Typography>

      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} my={2}>
        <Chip
          label="All Genres"
          color={selectedGenre === 'All Genres' ? 'primary' : 'default'}
          onClick={() => setSelectedGenre('All Genres')}
        />
        {genres.map(genreId => (
          <Chip
            key={genreId}
            label={genreIdToName[genreId] || genreId}
            color={selectedGenre === genreId ? 'primary' : 'default'}
            onClick={() => setSelectedGenre(genreId)}
          />
        ))}
      </Box>

      <Box display="flex" justifyContent="center" my={2}>
        <TextField
          variant="outlined"
          label="Search movies"
          value={search}
          onChange={e => setSearch(e.target.value)}
          fullWidth
          sx={{ maxWidth: 500 }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Poster</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  Rating
                  <IconButton onClick={() => setRatingOrder(ratingOrder === 'asc' ? 'desc' : 'asc')}>
                    {ratingOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  Popularity
                  <IconButton onClick={() => setPopularityOrder(popularityOrder === 'asc' ? 'desc' : 'asc')}>
                    {popularityOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredMovies.map(movie => (
              <TableRow key={movie.id}>
                <TableCell>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.original_title}
                    width={80}
                  />
                </TableCell>
                <TableCell>{movie.original_title}</TableCell>
                <TableCell>{movie.vote_average}</TableCell>
                <TableCell>{Math.round(movie.popularity)}</TableCell>
                <TableCell>
                  {(movie.genre_ids || []).map(id => genreIdToName[id]).join(', ')}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => HandleRemoveFromWatchList(movie)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  );
}

export default Watchlist;
