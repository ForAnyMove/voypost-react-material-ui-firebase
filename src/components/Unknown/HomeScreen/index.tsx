import { Avatar, Menu, MenuItem, Typography } from '@mui/material';
import firebase from 'firebase/app';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import clearFirestoreCache from '../../../common/clearFirestoreCache';

const HomeScreen: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        throw error;
      })
      .then(clearFirestoreCache);
  };
  return (
    <AppBar
      color="inherit"
      style={{
        padding: '0 2vw',
        backgroundColor: '#F50057',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box display="flex" alignItems="center">
        <MenuIcon />
        <Typography variant="h6" sx={{ mt: 2, mb: 2, ml: 5 }}>
          Voypost
        </Typography>
      </Box>
      <Avatar
        alt="Remy Sharp"
        style={{ backgroundColor: '#AAAAAA' }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        U
      </Avatar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default HomeScreen;
