import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth0 } from '../providers/Auth0';
import { makeStyles } from '@material-ui/core/styles';
import {
  ChevronLeft,
  Restaurant,
  Router,
  Settings,
  BugReport
} from '@material-ui/icons';
import { 
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    background: theme.palette.secondary, //'#282923',
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

const NAV_LINKS = [
  {icon: Restaurant, title: 'Plans', linkOpts: {to: '/plans'}},
  {icon: Router, title: 'HeaterMeter', linkOpts: {to: '/heaterMeter'}, requireAuth: true},
  {icon: Settings, title: 'Settings', linkOpts: {to: '/settings'}, requireAuth: true},
  {icon: BugReport, title: 'Bugs and Feedback', linkOpts: {to: '/bugs'}, requireAuth: true}
];

const SidebarNav = props => {
  const classes = useStyles(props);
  const {isAuthenticated} = useAuth0();

  const getNavLink = navLink => {
    const contents = (
      <ListItem button {...navLink.linkOpts} component={NavLink}>
        <ListItemIcon>
          <navLink.icon />
        </ListItemIcon>
        <ListItemText primary={navLink.title} />
      </ListItem>
    );
    return props.open ? contents : <Tooltip key={navLink.title} title={navLink.title}>{contents}</Tooltip>;
  };

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
        {NAV_LINKS.filter(navLink => isAuthenticated || !navLink.requireAuth).map(getNavLink)}
      </List>
    </Drawer>
  );
}

export default SidebarNav;
