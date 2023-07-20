import React, { useState } from 'react';
import { Router, Route, Routes, Link } from 'react-router-dom';
import history from './utils/history';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
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
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from './providers/Api';
import { SnackbarProvider } from './providers/Snackbar';
import { Box, styled } from '@mui/system';

const drawerWidth = 240;

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { loading } = useAuth0();
  const { userSettings } = useApi();
  const [open, setOpen] = useState(false);

  let themeOverride = userSettings.theme;
  if (!themeOverride) {
    themeOverride = localStorage.getItem('q-theme');
  }

  const theme = createTheme({
    palette: {
      mode: themeOverride || (prefersDarkMode ? 'dark' : 'light'),
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

  const Main = styled('main')(() => ({
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  }))

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Router location={history.location} navigator={history}>
          <Box sx={{ display: 'flex' }}>
            <Link sx={{ height: '50%' }} to='/newPlan'>Text</Link>
            <CssBaseline />
            <TopBar open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
            <SidebarNav open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
            <Main>
              <Box sx={(theme) => ({ ...theme.mixins.toolbar })} />
              {
                loading ?
                  <LinearProgress /> :
                  <Routes>
                    <Route path='/' element={<MainPage />} exact />
                    <Route path='/newPlan' element={<PrivateRoute />}>
                      <Route path='/newPlan' element={<NewPlanPage />} />
                    </Route>
                    <Route path='/editPlan/:planId' element={<PrivateRoute />}>
                      <Route path='/editPlan/:planId' element={<PlanEditPage />} />
                    </Route>
                    <Route path='/heaterMeter' element={<PrivateRoute />}>
                      <Route path='/heaterMeter' element={<HeaterMeterPage />} />
                    </Route>
                    <Route path='/settings' element={<PrivateRoute />}>
                      <Route path='/settings' element={<SettingsEditPage />} />
                    </Route>
                    <Route path='/bugs' element={<PrivateRoute />}>
                      <Route path='/bugs' element={<BugPage />} />
                    </Route>
                    <Route path='/plans/:planId' element={<PlanPage />} />
                    <Route path='/plans' element={<PlanListPage />} />
                  </Routes>
              }
            </Main>
          </Box>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;