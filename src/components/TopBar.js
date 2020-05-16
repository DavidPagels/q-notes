import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useAuth0 } from "../react-auth0-spa";

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
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  }
}));

const TopBar = props => {
	const classes = useStyles(props);
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	return (
		<AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => props.setOpen(true)}
          className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Dashboard
        </Typography>
        {isAuthenticated ? 
          <Button color='inherit' onClick={() => logout()}>Log out</Button> :
        	<Button color='inherit' onClick={() => loginWithRedirect({})}>Log in</Button>
    		}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;