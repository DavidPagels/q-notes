import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
  CssBaseline,
  LinearProgress,
  useMediaQuery
} from '@material-ui/core';
import TopBar from './components/TopBar';
import MainPage from './pages/MainPage';
import BugPage from './pages/BugPage';
import PlanListPage from './pages/PlanListPage';
import NewPlanPage from './pages/NewPlanPage';
import PlanEditPage from './pages/PlanEditPage';
import PlanPage from './pages/PlanPage';
import SettingsEditPage from './pages/SettingsEditPage';
import PrivateRoute from './components/PrivateRoute';
import SidebarNav from './components/SidebarNav';
import HeaterMeterPage from './pages/HeaterMeterPage';
import { useAuth0 } from './providers/Auth0';
import { useApi } from './providers/Api';
import { SnackbarProvider } from './providers/Snackbar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  fixedHeight: {
    height: 240,
  }
}));

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { loading } = useAuth0();
  const { userSettings } = useApi();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      type: userSettings.theme || (prefersDarkMode ? 'dark' : 'light'),
      primary: {
        main: '#4d062e'
      },
      secondary: {
        light: '#0066ff',
        main: '#096875',
        contrastText: '#ffcc00',
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    }
  });
  
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <BrowserRouter history={history}>
          <div className={classes.root}>
            <CssBaseline />
            <TopBar open={open} setOpen={setOpen} drawerWidth={drawerWidth}/>
            <SidebarNav open={open} setOpen={setOpen} drawerWidth={drawerWidth}/>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              { 
                loading ? 
                <LinearProgress /> :
                <Switch>
                  <Route path='/' component={MainPage} exact />
                  <PrivateRoute path='/newPlan' component={NewPlanPage} />
                  <PrivateRoute path='/editPlan/:planId' component={PlanEditPage} />
                  <PrivateRoute path='/heaterMeter' component={HeaterMeterPage} />
                  <PrivateRoute path='/settings' component={SettingsEditPage} />
                  <PrivateRoute path='/bugs' component={BugPage} />
                  <Route path='/plans/:planId' component={PlanPage} />
                  <Route path='/plans' component={PlanListPage} />
                </Switch>
              }
            </main>
          </div>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;