import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <AppBar position="sticky"> 
      <Toolbar>
        <img src="..\assets\MovieLogo.png" alt="logo" width={40} style={{ marginRight: 16 }} />
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          MovieVault
        </Typography>
        <Button sx={{padding : "1rem", fontSize:"1rem"}} color="inherit" component={Link} to="/">Home</Button>
        <Button sx={{padding : "1rem" ,fontSize:"1rem"}} color="inherit" component={Link} to="/watchlist">Watchlist</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
