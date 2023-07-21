import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth0 } from '@auth0/auth0-react';

// const useStyles = makeStyles(theme => ({
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     })
//   },
//   appBarShift: {
//     marginLeft: props => props.drawerWidth,
//     width: props => `calc(100% - ${props.drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   },
//   menuButton: {
//     marginRight: 36
//   },
//   menuButtonHidden: {
//     display: 'none'
//   },
//   title: {
//     fontFamily: 'Gochi Hand',
//     flexGrow: 1,
//     textDecoration: 'none'
//   },
//   toolbar: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: 24 // keep right padding when drawer closed
//   },
//   userIcon: {
//     width: theme.spacing(3),
//     height: theme.spacing(3),
//     borderRadius: '25%'
//   },
//   userName: {
//     paddingRight: theme.spacing(1)
//   }
// }));

const UserName = styled('div')(({ theme }) => ({
  paddingRight: theme.spacing(1)
}));

const UserPhoto = styled('img')(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
  borderRadius: '25%'
}));

const TopBar = props => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = ev => {
    setAnchorEl(ev.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const renderUserMenu = () => {
    return (
      <div>
        <Button color='inherit' aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuOpen}>
          <UserName color='inherit'>
            {user.name}
          </UserName>
          <UserPhoto alt={`${user.name} profile`} src={user.picture} />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={ev => logout({ returnTo: window.location.origin }) && handleMenuClose(ev)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }

  return (
    <AppBar position='absolute'> {/* className={clsx(classes.appBar, props.open && classes.appBarShift)}>*/}
      <Toolbar sx={{ paddingLeft: theme => theme.spacing(2), paddingRight: theme => theme.spacing(2) }}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={() => props.setOpen(true)}
        // className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography {...{ to: '/' }}
          component={Link}
          variant='h4'
          sx={{
            fontFamily: 'Gochi Hand',
            flexGrow: 1,
            textDecoration: 'none'
          }}
          color='inherit'
          noWrap
        >
          Q Notes
        </Typography>
        {isAuthenticated && user ?
          renderUserMenu() :
          <Button color='inherit' onClick={() => loginWithRedirect({
            appState: { targetUrl: window.location.pathname }
          })}>Log in</Button>
        }
      </Toolbar>
    </AppBar >
  );
};

export default TopBar;