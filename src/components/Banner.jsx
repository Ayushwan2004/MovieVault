import React from 'react';
import { Box, Typography } from '@mui/material';
import BannerImage from '../assets/Banner.jpg';

function Banner() {
  return (
    <Box
      sx={{
        height: '60vh',
        backgroundImage: `url(${BannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.3)',
        backgroundBlendMode: 'darken'
      }}
    >
      <Typography variant="h2" component="div" >
        MovieVault
      </Typography>
    </Box>
  );
}

export default Banner;
