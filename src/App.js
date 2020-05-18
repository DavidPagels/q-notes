import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  LinearProgress
} from '@material-ui/core';
import TopBar from './components/TopBar';
import PlanListPage from './pages/PlanListPage';
import PlanEditPage from './pages/PlanEditPage';
import PlanViewPage from './pages/PlanViewPage';
import ResultsListPage from './pages/ResultsListPage';
import SettingsPage from './pages/SettingsPage';
import PrivateRoute from './components/PrivateRoute';
import SidebarNav from './components/SidebarNav';
import { useAuth0 } from "./react-auth0-spa";

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
  const [open, setOpen] = useState(true);
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
            <Container maxWidth="lg" className={classes.container}>
              <Switch>
                <Route path='/' exact />
                <Route path="/plans" component={PlanListPage} />
                <PrivateRoute path="/addPlan" component={PlanEditPage} />
                <PrivateRoute path="/results" component={ResultsListPage} />
                <PrivateRoute path="/settings" component={SettingsPage} />
                <PrivateRoute path="/planView/:id" component={PlanViewPage} />
              </Switch>
            </Container>
          }
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;