import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { Box, Typography, Grid } from '@mui/material';
function Movies({ HandleAddToWatchList, HandleRemoveFromWatchList, watchList }) {
  const [Movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => setPageNo(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPageNo(prev => prev + 1);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=9fbf13c5d02ce135847dfd20d25be11c&page=${pageNo}`)
      .then(res => setMovies(res.data.results));
  }, [pageNo]);

  return (
    <Box p={4}>
      <Typography variant="h4" textAlign="center">Trending Movies</Typography>
      <Grid container spacing={2} justifyContent="center" mt={2}>
        {Movies.map(movieObj => (
          <Grid item key={movieObj.id}>
            <MovieCard
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
              watchList={watchList}
              HandleAddToWatchList={HandleAddToWatchList}
              HandleRemoveFromWatchList={HandleRemoveFromWatchList}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext} />
      <Typography className='text-center py-5 text-xl space-x-3'>Coded with <PsychologyIcon/> by AW<a className='underline underline-offset-4' href="https://github.com/Ayushwan2004">Github </a></Typography>
    </Box>
    
  );
}

export default Movies;
