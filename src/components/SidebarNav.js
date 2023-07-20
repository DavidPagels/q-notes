import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { styled } from '@mui/system';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RouterIcon from '@mui/icons-material/Router';
import SettingsIcon from '@mui/icons-material/Settings';
import BugReportIcon from '@mui/icons-material/BugReport';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

// const useStyles = makeStyles(theme => ({
//   drawerPaper: {
//     background: theme.palette.secondary, //'#282923',
//     position: 'relative',
//     whiteSpace: 'nowrap',
//     width: props => props.drawerWidth,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   },
//   drawerPaperClose: {
//     overflowX: 'hidden',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     }),
//     width: () => theme.spacing(7),
//     [theme.breakpoints.up('sm')]: {
//       width: theme.spacing(9)
//     }
//   }
// }));

const ToolbarIcon = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  })
)

const NAV_LINKS = [
  { icon: RestaurantIcon, title: 'Plans', linkOpts: { to: '/plans' } },
  { icon: RouterIcon, title: 'HeaterMeter', linkOpts: { to: '/heaterMeter' }, requireAuth: true },
  { icon: SettingsIcon, title: 'Settings', linkOpts: { to: '/settings' }, requireAuth: true },
  { icon: BugReportIcon, title: 'Bugs and Feedback', linkOpts: { to: '/bugs' }, requireAuth: true }
];

const SidebarNav = props => {
  const { isAuthenticated } = useAuth0();
  const getNavLink = (navLink, idx) => {
    const contents = (
      <ListItemButton {...navLink.linkOpts} key={`navLink${idx}`} component={Link}>
        <ListItemIcon>
          <navLink.icon />
        </ListItemIcon>
        <ListItemText primary={navLink.title} />
      </ListItemButton>
    );
    return props.open ? contents : <Tooltip key={navLink.title} title={navLink.title}>{contents}</Tooltip>;
  };

  return (
    <Drawer
      variant='permanent'
      open={props.open}
    >
      <ToolbarIcon>
        <IconButton onClick={() => props.setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </ToolbarIcon>
      <Divider />
      <List>
        {NAV_LINKS.filter(navLink => isAuthenticated || !navLink.requireAuth).map(getNavLink)}
      </List>
    </Drawer>
  );
}

export default SidebarNav;
