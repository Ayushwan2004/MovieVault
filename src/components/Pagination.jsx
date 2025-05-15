import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Pagination({ handlePrev, handleNext, pageNo }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <IconButton onClick={handlePrev}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6" mx={2}>{pageNo}</Typography>
      <IconButton onClick={handleNext}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}

export default Pagination;
