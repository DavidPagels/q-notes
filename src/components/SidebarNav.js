import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  ChevronLeft,
  Note,
  Restaurant,
  Router,
  Settings
} from '@material-ui/icons';
import { 
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: props => props.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: () => theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}));

const SidebarNav = props => {
  const classes = useStyles(props);

  return (
    <Drawer
          variant='permanent'
          classes={{
            paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
          }}
          open={props.open}
        >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => props.setOpen(false)}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button {...{to: '/plans'}} component={NavLink}>
          <ListItemIcon>
            <Note />
          </ListItemIcon>
          <ListItemText primary='Plans' />
        </ListItem>
        <ListItem button {...{to: '/heaterMeter'}} component={NavLink}>
          <ListItemIcon>
            <Router />
          </ListItemIcon>
          <ListItemText primary='Heater Meter' />
        </ListItem>
        <ListItem button {...{to: '/results'}} component={NavLink}>
          <ListItemIcon>
            <Restaurant />
          </ListItemIcon>
          <ListItemText primary='Results' />
        </ListItem>
        <ListItem button {...{to: '/settings'}} component={NavLink}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary='Settings' />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SidebarNav;
