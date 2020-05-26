import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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
    marginTop: theme.spacing(2),
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
            <Typography variant='caption' color='textSecondary'>
              In order to allow the site connect to your HeaterMeter, please follow the instructions 
              <Link href='https://github.com/shmick/hm-letsencrypt'> here.</Link> You will need to get your 
              HeaterMeter a free domain and get it certified by a CA (letsencrypt for free) in order 
              for this site to connect to it. You will also need to update your HeaterMeter's
              firmware <Link href='https://github.com/CapnBry/HeaterMeter/wiki/Upgrading-HeaterMeter-Software'> 
              following these instructions</Link> to the latest development snapshot so that the HeaterMeter's 
              API response headers will be set up correctly.Once that is set up, please enter your HeaterMeter URL 
              in the format `https://yourdomain.com/`. 
            </Typography>
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
