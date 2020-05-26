import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PaperContainer from '../components/PaperContainer';
import { useApi } from '../providers/Api';
import HeaterMeterGraph from '../components/HeaterMeterGraph';
import * as moment from 'moment';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex'
  },
  title: {
    marginBottom: theme.spacing(2),
    flexGrow: 1
  },
  metricContainer: {
    marginBottom: theme.spacing(2)
  },
  time: {},
  setpoint: {color: 'rgba(255,0,0,0.8)'},
  probe0: {color: '#e73'},
  probe1: {color: '#6c3'},
  probe2: {color: '#297'},
  probe3: {color: '#789'},
  pidOut: {color: '#6cf'}
}));

const HeaterMeterPage = props => {
  const classes = useStyles();
  const { userSettings } = useApi();
  let heaterMeterSource;

  const [hmData, setHmData] = useState([]);

  const extractData = csvRow => {
    const cols = csvRow.split(',');
    const [timestamp, setpoint, probe0, probe1, probe2, probe3, pidOut] = cols;
    return {time: new Date(Number(timestamp) * 1000), setpoint, probe0, probe1, probe2, probe3, pidOut};
  }

  const startHeaterMeterStream = async () => {
    const url = `${userSettings.heaterMeterUrl}luci/lm/stream`;
    heaterMeterSource = new window.EventSource(url, {rejectUnauthorized: false, https:{ rejectUnauthorized: false}});
    heaterMeterSource.addEventListener('hmstatus', getUpdates);
  }

  const getUpdates = update => {
    const { data } = update;
    const parsed = JSON.parse(data);
    const { 
      time,
      set: setpoint,
      fan: {c: pidOut},
      temps: {
        0: {c: probe0}, 
        1: {c: probe1},
        2: {c: probe2},
        3: {c: probe3}
      } 
    } = parsed;
    const newReading = {time: new Date(Number(time) * 1000), setpoint, probe0, probe1, probe2, probe3, pidOut};
    return setHmData(prevHmData => ([...prevHmData, newReading]));
  }

  const closeHeaterMeterStream = () => {
    if (heaterMeterSource) {
      heaterMeterSource.close();
    }
  }

  const getHeaterMeterData = async () => {
    const url = `${userSettings.heaterMeterUrl}luci/lm/hist`;
    const resp = await fetch(url);
    if (resp.ok) {
      const respText = await resp.text();
      const csvRows = respText.split('\n').filter(row => row);
      await setHmData(csvRows.map(extractData));
      startHeaterMeterStream();
    }
  };

  useEffect(() => {
    if (userSettings.heaterMeterUrl) {
      getHeaterMeterData();
    }
    return closeHeaterMeterStream;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSettings]);

  const mostRecent = hmData.slice(-1) || [];
  const metricList = [
    {metricName: 'time', title: 'Time', parser: (val) => moment(val).format('h:mm:ss a')},
    {metricName: 'setpoint', title: 'Setpoint'},
    {metricName: 'probe0', title: 'Probe 0'},
    {metricName: 'probe1', title: 'Probe 1'},
    {metricName: 'probe2', title: 'Probe 2'},
    {metricName: 'probe3', title: 'Probe 3'},
    {metricName: 'pidOut', title: 'PID Out'},
  ];

	return (
    <PaperContainer>
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant='h6'>
          HeaterMeter Status
        </Typography>
      </div>
      <p>Current Readings</p>
      <Grid container alignItems='flex-start' spacing={2} className={classes.metricContainer}>
        {mostRecent.length ? metricList.filter(metric => mostRecent[0][metric.metricName]).map(metric => {
          return <Grid key={metric.metricName} item xs={6} md={3} className={classes[metric.metricName]}>
            {
              `${metric.title}: ${metric.parser ? metric.parser(mostRecent[0][metric.metricName]) : mostRecent[0][metric.metricName]}`
            }
          </Grid>;
        }): ''}
      </Grid>
      <HeaterMeterGraph hmData={hmData}/>
    </PaperContainer>
	);
};

export default HeaterMeterPage;
