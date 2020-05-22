import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Toolbar,
  Typography,
	Paper
} from '@material-ui/core';
import {FileCopy} from '@material-ui/icons';
import { useApi } from '../providers/Api';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  }
}));

const SettingsPage = (props) => {
	const classes = useStyles();
  const { userId } = useParams();

  useEffect(() => {
  }, []);

	return (
		<div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar className={classes.root}>
          <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
            {userId}
          </Typography>
          <IconButton href={`/copyPlan/${userId}`}>
            <FileCopy />
          </IconButton>
        </Toolbar>
			</Paper>
		</div>
	);
};

export default SettingsPage;
