import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../providers/Api';
import { useSnackbar } from '../providers/Snackbar';
import PaperContainer from '../components/PaperContainer';

const ButtonContainer = styled('div')(
  ({ theme }) => ({
    width: '100%',
    paddingTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'flex-end'
  })
);

const StyledButton = styled(Button)(
  ({ theme }) => ({
    width: theme.spacing(12)
  })
);

const SettingsEditPage = (props) => {
  const navigate = useNavigate();
  const { putRequest, userSettings, updateUserSettings } = useApi();
  const { user } = useAuth0();
  const [theme, setTheme] = useState(userSettings.theme || 'light');
  const [heaterMeterUrl, setHeaterMeterUrl] = useState(userSettings.heaterMeterUrl || '');
  const { showSnackbar } = useSnackbar();

  const updateSettings = async ev => {
    ev.preventDefault();
    const requestBody = { theme, heaterMeterUrl };
    await putRequest(`/users/settings`, requestBody);
    await updateUserSettings();
    showSnackbar('Settings Saved');
    navigate('/');
  };

  const handleThemeToggle = ev => {
    setTheme(ev.target.checked ? 'dark' : 'light')
  };

  const cancelEdit = ev => {
    navigate(-1);
  };

  return (
    <PaperContainer>
      <Typography sx={(theme) => ({ paddingBottom: theme.spacing(2) })} variant='h6'>
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
              sx={(theme) => ({ marginTop: theme.spacing(2), width: '100%' })}
              defaultValue={heaterMeterUrl}
              label='HeaterMeter Url'
              onChange={e => setHeaterMeterUrl(e.target.value)}
              variant='outlined' />
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
        <ButtonContainer>
          <StyledButton sx={(theme) => ({ marginRight: theme.spacing(2) })} onClick={cancelEdit} variant='contained'>Cancel</StyledButton>
          <StyledButton variant='contained' color='primary' type='submit'>
            Save
          </StyledButton>
        </ButtonContainer>
      </form>
    </PaperContainer>
  );
};

export default SettingsEditPage;
