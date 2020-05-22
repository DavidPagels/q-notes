import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import {
  Button,
  Grid,
  Paper,
  TextField
} from '@material-ui/core';
import { useApi } from '../providers/Api';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2)
  }
}));

const SettingsEditPage = (props) => {
  const classes = useStyles();
  const { putRequest } = useApi();
  const { userId } = useParams();
  const [heatermeterUrl, setHeatermeterUrl] = React.useState();

  const updateSettings = async e => {
    e.preventDefault();
    const requestBody = {heatermeterUrl};
    await putRequest(`/settings`, requestBody);
    props.history.push();
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={updateSettings} noValidate>
          <Grid container alignItems='flex-start' spacing={2}>
            <Grid item xs={6}>
              <TextField id='filled-basic' label='Heatermeter Url' onChange={e => setHeatermeterUrl(e.target.value)} variant='filled'/>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default SettingsEditPage;
