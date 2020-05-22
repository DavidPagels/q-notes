import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  LinearProgress
} from '@material-ui/core';
import TopBar from './components/TopBar';
import MainPage from './pages/MainPage';
import PlanListPage from './pages/PlanListPage';
import PlanEditPage from './pages/PlanEditPage';
import PlanPage from './pages/PlanPage';
import ResultsListPage from './pages/ResultsListPage';
import SettingsPage from './pages/SettingsPage';
import SettingsEditPage from './pages/SettingsEditPage';
import PrivateRoute from './components/PrivateRoute';
import SidebarNav from './components/SidebarNav';
import HeaterMeterGraph from './components/HeaterMeterGraph';
import { useAuth0 } from './providers/Auth0';

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
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  fixedHeight: {
    height: 240,
  }
}));

const App = () => {
  const {loading} = useAuth0();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  
  return (
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
            <Container maxWidth='lg' className={classes.container}>
              <Switch>
                <Route path='/' component={MainPage} exact />
                <PrivateRoute path='/newPlan' component={PlanEditPage} />
                <PrivateRoute path='/editPlan/:planId' component={PlanEditPage} />
                <PrivateRoute path='/copyPlan/:planId' component={PlanEditPage} />
                <PrivateRoute path='/heaterMeter' component={HeaterMeterGraph} />
                <PrivateRoute path='/settings' component={SettingsPage} />
                <Route path='/results' component={ResultsListPage} />
                <Route path='/plans/:planId' component={PlanPage} />
                <Route path='/plans' component={PlanListPage} />
              </Switch>
            </Container>
          }
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;