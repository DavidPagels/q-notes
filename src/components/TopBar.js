import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu'
import { useAuth0 } from '../providers/Auth0';

const useStyles = makeStyles(theme => ({
	appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: props => props.drawerWidth,
    width: props => `calc(100% - ${props.drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    fontFamily: 'Gochi Hand',
    flexGrow: 1,
    textDecoration: 'none'
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: 24 // keep right padding when drawer closed
  },
  userIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    borderRadius: '25%'
  },
  userName: {
    paddingRight: theme.spacing(1)
  }
}));

const TopBar = props => {
	const classes = useStyles(props);
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
          <div color='inherit' className={classes.userName}>
            {user.name}
          </div>
          <img alt={`${user.name} profile`} src={user.picture} className={classes.userIcon}/>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={ev => logout({returnTo: window.location.origin}) && handleMenuClose(ev)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }

	return (
		<AppBar position='absolute' className={clsx(classes.appBar, props.open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={() => props.setOpen(true)}
          className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography {...{to: '/'}} component={Link} variant='h4' className={classes.title} color='inherit' noWrap>
          Q Notes
        </Typography>
        {isAuthenticated && user ? 
          renderUserMenu() :
        	<Button color='inherit' onClick={() => loginWithRedirect({
            appState: {targetUrl: window.location.pathname}
            })}>Log in</Button>
    		}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;