import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth0 } from '../providers/Auth0';
import { makeStyles } from '@material-ui/core/styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RouterIcon from '@material-ui/icons/Router';
import SettingsIcon from '@material-ui/icons/Settings';
import BugReportIcon from '@material-ui/icons/BugReport';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

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
  {icon: RestaurantIcon, title: 'Plans', linkOpts: {to: '/plans'}},
  {icon: RouterIcon, title: 'HeaterMeter', linkOpts: {to: '/heaterMeter'}, requireAuth: true},
  {icon: SettingsIcon, title: 'Settings', linkOpts: {to: '/settings'}, requireAuth: true},
  {icon: BugReportIcon, title: 'Bugs and Feedback', linkOpts: {to: '/bugs'}, requireAuth: true}
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
          <ChevronLeftIcon />
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
