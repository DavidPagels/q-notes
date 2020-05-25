import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Grid,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';
import { useAuth0 } from '../providers/Auth0';
import { useApi } from '../providers/Api';
import { useSnackbar } from '../providers/Snackbar';
import PaperContainer from '../components/PaperContainer';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    width: '100%',
    paddingTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    width: theme.spacing(12)
  },
  firstButton: {
    marginRight: theme.spacing(2)
  },
  hmuInput: {
    width: '100%'
  },
  title: {
    paddingBottom: theme.spacing(2)
  }
}));

const SettingsEditPage = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { putRequest, userSettings, updateUserSettings } = useApi();
  const { user } = useAuth0();
  const [theme, setTheme] = useState(userSettings.theme || 'light');
  const [heaterMeterUrl, setHeaterMeterUrl] = useState(userSettings.heaterMeterUrl || '');
  const { showSnackbar } = useSnackbar();

  const updateSettings = async ev => {
    ev.preventDefault();
    const requestBody = {theme, heaterMeterUrl};
    await putRequest(`/users/settings`, requestBody);
    await updateUserSettings();
    showSnackbar('Settings Saved');
    props.history.push('/');
  };

  const handleThemeToggle = ev => {
    console.log(ev);
    setTheme(ev.target.checked ? 'dark' : 'light')
  };

  const cancelEdit = ev => {
    history.goBack();
  };

  return (
    <PaperContainer>
      <Typography className={classes.title} variant='h6'>
        Edit Settings for user {user.name}
      </Typography>
      <form onSubmit={updateSettings} noValidate>
        <Grid container alignItems='flex-start' spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField 
              className={classes.hmuInput}
              defaultValue={heaterMeterUrl}
              label='HeaterMeter Url' 
              onChange={e => setHeaterMeterUrl(e.target.value)} 
              variant='outlined'/>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>Light Mode</Grid>
              <Grid item>
                <Switch checked={theme === 'dark'} onChange={handleThemeToggle} />
              </Grid>
              <Grid item>Dark Mode</Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.buttonContainer}>
          <Button className={`${classes.button} ${classes.firstButton}`} onClick={cancelEdit} variant='contained'>Cancel</Button>
          <Button className={classes.button} variant='contained' color='primary' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </PaperContainer>
  );
};

export default SettingsEditPage;
